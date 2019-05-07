import * as tf from "@tensorflow/tfjs";

import { createDeepQNetwork } from "./dqn";
import PacMan from "../Pacman/index";
import { ReplayMemory } from "./replaymemory";

function assertPositiveInteger(x, name) {
  if (!Number.isInteger(x)) {
    throw new Error(`Expected ${name} to be an integer, but received ${x}`);
  }
  if (!(x > 0)) {
    throw new Error(
      `Expected ${name} to be a positive number, but received ${x}`
    );
  }
}

export class PacManAgent {
  /**
   * Constructor of SnakeGameAgent.
   *
   * @param {SnakeGame} game A game object.
   * @param {object} config The configuration object with the following keys:
   *   - `replayBufferSize` {number} Size of the replay memory. Must be a
   *     positive integer.
   *   - `epsilonInit` {number} Initial value of epsilon (for the epsilon-
   *     greedy algorithm). Must be >= 0 and <= 1.
   *   - `epsilonFinal` {number} The final value of epsilon. Must be >= 0 and
   *     <= 1.
   *   - `epsilonDecayFrames` {number} The # of frames over which the value of
   *     `epsilon` decreases from `episloInit` to `epsilonFinal`, via a linear
   *     schedule.
   */
  constructor(game, config) {
    assertPositiveInteger(config.epsilonDecayFrames);

    this.game = new PacMan();

    this.epsilonInit = config.epsilonInit;
    this.epsilonFinal = config.epsilonFinal;
    this.epsilonDecayFrames = config.epsilonDecayFrames;
    this.epsilonIncrement_ =
      (this.epsilonFinal - this.epsilonInit) / this.epsilonDecayFrames;

    this.onlineNetwork = createDeepQNetwork(
      game.HEIGHT,
      game.WIDTH,
      NUM_ACTIONS
    );
    this.targetNetwork = createDeepQNetwork(
      game.HEIGHT,
      game.WIDTH,
      NUM_ACTIONS
    );
    // Freeze taget network: it's weights are updated only through copying from
    // the online network.
    this.targetNetwork.trainable = false;

    this.optimizer = tf.train.adam(config.learningRate);

    this.replayBufferSize = config.replayBufferSize;
    this.replayMemory = new ReplayMemory(config.replayBufferSize);
    this.frameCount = 0;
    this.reset();
  }

  reset() {
    this.cumulativeReward_ = 0;
    this.game.reset();
  }

  /**
   * Play one step of the game.
   *
   * @returns {number | null} If this step leads to the end of the game,
   *   the total reward from the game as a plain number. Else, `null`.
   */
  playStep() {
    this.epsilon =
      this.frameCount >= this.epsilonDecayFrames
        ? this.epsilonFinal
        : this.epsilonInit + this.epsilonIncrement_ * this.frameCount;
    this.frameCount++;

    // The epsilon-greedy algorithm.
    let action;
    const state = this.game.getState();
    if (Math.random() < this.epsilon) {
      // Pick an action at random.
      action = getRandomAction();
    } else {
      // Greedily pick an action based on online DQN output.
      tf.tidy(() => {
        const stateTensor = getStateTensor(
          state,
          this.game.HEIGHT,
          this.game.WIDTH
        );
        action =
          ALL_ACTIONS[
            this.onlineNetwork
              .predict(stateTensor)
              .argMax(-1)
              .dataSync()[0]
          ];
      });
    }

    const { state: nextState, reward, done } = this.game.step(action);

    this.replayMemory.append([state, action, reward, done, nextState]);
    console.log("stuff is happening");
    this.cumulativeReward_ += reward;
    const output = {
      action,
      cumulativeReward: this.cumulativeReward_,
      done
    };
    if (done) {
      this.reset();
    }
    return output;
  }

  /**
   * Perform training on a randomly sampled batch from the replay buffer.
   *
   * @param {number} batchSize Batch size.
   * @param {numebr} gamma Reward discount rate. Must be >= 0 and <= 1.
   * @param {tf.train.Optimizer} optimizer The optimizer object used to update
   *   the weights of the online network.
   */
  trainOnReplayBatch(batchSize, gamma, optimizer) {
    // Get a batch of examples from the replay buffer.
    const batch = this.replayMemory.sample(batchSize);
    const lossFunction = () =>
      tf.tidy(() => {
        const stateTensor = getStateTensor(
          batch.map(example => example[0]),
          this.game.HEIGHT,
          this.game.WIDTH
        );
        const actionTensor = tf.tensor1d(
          batch.map(example => example[1]),
          "int32"
        );
        const qs = this.onlineNetwork
          .predict(stateTensor)
          .mul(tf.oneHot(actionTensor, NUM_ACTIONS))
          .sum(-1);

        const rewardTensor = tf.tensor1d(batch.map(example => example[2]));
        const nextStateTensor = getStateTensor(
          batch.map(example => example[4]),
          this.game.HEIGHT,
          this.game.WIDTH
        );
        const nextMaxQTensor = this.targetNetwork
          .predict(nextStateTensor)
          .max(-1);
        const doneMask = tf
          .scalar(1)
          .sub(tf.tensor1d(batch.map(example => example[3])).asType("float32"));
        const targetQs = rewardTensor.add(
          nextMaxQTensor.mul(doneMask).mul(gamma)
        );
        return tf.losses.meanSquaredError(targetQs, qs);
      });

    // TODO(cais): Remove the second argument when `variableGrads()` obeys the
    // trainable flag.
    const grads = tf.variableGrads(
      lossFunction,
      this.onlineNetwork.getWeights()
    );
    optimizer.applyGradients(grads.grads);
    tf.dispose(grads);
    // TODO(cais): Return the loss value here?
  }
}
