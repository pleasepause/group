import * as tf from "@tensorflow/tfjs";
import React, { Component } from "react";
import { EAST, NORTH, WEST, SOUTH } from "../PacmanGame/constants";
import eps, { epsYs } from "./trainingepisodes";

export let completedEpisode;

export default class DeepQ extends Component {
  constructor(props) {
    super(props);
    let firstTime = true;
    this.state = {
      prevScore: 0,
      currScore: this.props.score,
      cumulativeReward: 0,
      prevAction: null,
      currAction: this.props.player.direction,
      scoreTracking: false,
      episode: [],
      currentReward: 0,
      prevPosition: null,
      currPosition: this.props.player.position,
      replayBuffer: [],
      done: false,
      model: []
    };

    this.stateToVector = this.stateToVector.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.scoreTrack = this.scoreTrack.bind(this);
    this.handleEpisode = this.handleEpisode.bind(this);
    this.train = this.train.bind(this);
    this.setup = this.setup.bind(this);
    this.act = this.act.bind(this);
    this.trainerCaller = this.trainerCaller.bind(this);
    this.load = this.load.bind(this);
    this.nextGuess = this.nextGuess.bind(this);
    // this.actionInterval = this.actionInterval.bind(this);
  }

  componentDidMount() {
    // console.log("PROPS IN TENSORS.JS", this.props.live);
    window.addEventListener(
      "keydown",
      this.handleMove(this.props.food, this.props.player)
    );
    this.setup();
  }

  // componentDidUpdate() {
  //   console.log(
  //     "player direction",
  //     this.props.player.direction,
  //     "next direction",
  //     this.props.player.nextDirection
  //   );
  // }

  setup() {
    let actionInterval;
    actionInterval = setInterval(() => {
      // console.log("SCORE: ", this.props.score);
      // console.log("LOCAL STATE: ", this.state);
      // console.log("LOCAL PROPS", this.props.score);
      // if (!this.state.prevScore) {
      //   this.setState({
      //     // ...this.state,
      //     prevScore: this.props.score
      //   });
      // }

      //if we eat all pellets or die, then stop the action interval
      if (this.props.score >= 61 || this.props.lost) {
        completedEpisode = this.state.episode;
        clearInterval(actionInterval);
      }

      let newPrev = this.state.currScore;
      let newPrevAction = this.state.currAction;
      let newPrevPosition = this.state.currPosition;
      this.setState({
        currScore: this.props.score,
        prevScore: newPrev
      });

      //add to our replay buffer
      if (this.state.episode.length > 2) {
        // console.log("inside of tuple conditional");
        let tuple = [
          this.state.episode[this.state.episode.length - 2],
          this.state.episode[this.state.episode.length - 1]
        ];
        this.state.replayBuffer.push(tuple, this.state.done);
      }

      if (!this.state.prevPosition) {
        this.setState({
          prevPosition: newPrevPosition,
          currPosition: this.props.player.position
        });
      } else {
        this.setState({
          prevPosition: newPrevPosition,
          currPosition: this.props.player.position
        });
      }
      // if (this.state.prevPosition.join() === this.state.currPosition.join()) {
      //   console.log("DO NOT STAND STILL!, -5 points");
      // }
      if (this.state.currScore === this.state.prevScore) {
        // console.log("You got a negative reward!");
        this.setState({
          currentReward: -1,
          cumulativeReward: this.state.cumulativeReward - 1
        });

        if (!this.state.scoreTracking) {
          this.setState({
            ...this.state,
            scoreTracking: true
          });
          //calling scoreTrack method
          this.scoreTrack();
        }
        //start a time for 60 secs, in callback function of timer, if this.state curr & prev scores are the same as when the timer started, then reset the game
      } else {
        // console.log("you got a positive reward");
        this.setState({
          currentReward: 1,
          cumulativeReward: this.state.cumulativeReward + 1
        });
      }
      if (!this.state.prevAction) {
        this.setState({
          currAction: this.props.player.direction,
          prevAction: newPrevAction
        });
      }

      this.setState({
        episode: [
          ...this.state.episode,
          [
            this.props.player.direction,
            this.state.currentReward,
            this.state.cumulativeReward,
            this.state.currPosition[0] / 25,
            this.state.currPosition[1] / 28
          ]
        ]
      });
      let randomIdx = Math.floor(Math.random() * 4);
      // let dummyArr = dummyOutputs[randomIdx];
      // this.act(dummyArr);
      this.nextGuess();
    }, 220);

    // setTimeout(() => clearInterval(actionInterval), 5000);
  }

  scoreTrack() {
    // console.log(
    //   "prevScore at time of invoke: ",
    //   startPrevScore,
    //   "currScore at time of invoke: ",
    //   startCurrScore
    // );
    // console.log(
    //   "real current score:",
    //   this.state.currScore,
    //   "real prev score: ",
    //   this.state.prevScore
    // );
    setTimeout(() => {
      // this.props.reset();
      // this.setState({
      //   ...this.state,
      //   scoreTracking: false
      // });
      this.state.scoreTracking = false;
      let { currScore, prevScore, prevPosition, currPosition } = this.state;
      if (
        prevScore === currScore &&
        prevPosition.join() === currPosition.join()
      ) {
        // console.log("YOU TRIGGERED THE CONDITIONAL!!!!");
        this.props.reset();
        // this.props.pause();
      }
    }, 20000);
  }

  act(arr) {
    // console.log("Passed in Arr: ", arr);
    let resultIdx = arr.indexOf(arr.reduce((a, c) => Math.max(a, c)));
    // console.log("RESULTIDX: ", resultIdx);
    // this.props.player.direction = resultIdx;
    // this.step(resultIdx);
  }

  step(idx) {
    //take in the chosen action (0-3), determine what the reward and newstate would be given this action. also save the curr state as prevstate.
    //in order to determine what the reward and next state are, we need to then include the player.position as a feature for input.
    //if we know the player position, we can then predict their position for the next step given their direction...we can use food array to determine if they're landing on an eaten vs uneaten pellet, and can use prev position vs currposition to determine if they hit a wall
    console.log(
      "current direction",
      this.props.player.direction,
      "next direction: ",
      idx,
      "current player position",
      this.props.player.position,
      "FOOD: ",
      this.props.food
    );
    // let nextState = (this.props.player.direction = idx);
    // player position + next direction -- check against path array and see if coordinate exists, if it does then we know that next player position is that coordinate - if not then we know that next player position will be one more in the same direction as its current direction. if we store eaten pellets coordinates in local state, we can check and see if this coordinate exists in that, thus informing what next state's reward & cumulattive reward.
  }

  handleEpisode() {
    console.log("EPISODE:", this.state.episode);
  }
  trainerCaller() {
    //taking an array of completed episode of steps, an iterating through and calling train on each step.
    for (let i = 0; i < eps.episode4.length; i++) {
      console.log("WHAT WHAT IN TEH BUTT:", eps.episode4[i]);
      console.log(Array.isArray(eps.episode4[i]));
      this.train(eps.episode4[i], i);
    }
  }

  async train(step, i) {
    console.log("step", step);
    console.log("i", i);
    let xs = tf.tensor([[step]]);
    xs.print();
    let ys = tf.tensor([[epsYs(eps.episode4)[i]]]);
    ys.print();
    console.log("xs.length:", xs.shape[0]);
    console.log(eps.episode4);
    console.log(epsYs(eps.episode4));

    console.log("YS: ", ys);
    console.log("Xs ", xs);
    // ys.print();
    // const xs = tf.tensor2d([this.state.episode]);
    // const xs = tf.tensor([[0, 0, 0], [0, 0, 0]]); //shape of 1,3
    // console.log("TEST INPUT: ", xs);
    // xs.print();
    // const ys = tf.tensor([[0, 0, 1, 0], [0, 0, 1, 0]]); //1 example of 4 things 1,4
    // ys.print();
    const pacmodel = tf.sequential({});

    pacmodel.add(
      tf.layers.dense({
        inputShape: [1, 5],
        units: 6,
        activation: "relu"
      })
    );

    pacmodel.add(tf.layers.dense({ units: 4, activation: "softmax" }));

    // layers: [
    //   tf.layers.dense({ inputShape: [3], units: 6, activation: "relu" }),
    //   tf.layers.dense({ units: 4, activation: "softmax" })
    // ]

    const sgdOpt = tf.train.sgd(0.1);

    pacmodel.compile({
      optimizer: sgdOpt,
      loss: "meanSquaredError"
    });

    pacmodel.summary();

    await pacmodel
      .fit(xs, ys, {
        epochs: 2,
        shuffle: true,
        callbacks: {
          onEpochEnd: () => console.log(pacmodel)
        }
      })
      .then(results => {
        console.log("RESULTS: ", results);
      });

    this.setState({
      model: pacmodel
    });

    //SAVE THE MODEL
    let myStorage = window.localStorage;
    await pacmodel
      .save(`localstorage://${myStorage}`)
      .then(() => console.log("done saving"));

    tf.dispose({
      xs,
      ys
    });

    // let outputs = trainedmodel.predict(inputs);
    // outputs.print();

    // pacmodel.predict(tf.ones(tf.tensor([1, 4])).print());

    // .then(result => console.log("RESULT! ", result));

    // const input =  this.state.episode

    // let loadedD = await tf.loadLayersModel(`localstorage://${myStorage}`);
    // console.log("LOADED: ", loadedD);
  }

  nextGuess() {
    //now that model is train we can take in each current step and pass into predict and make move based on output
    let currStep = this.state.episode[this.state.episode.length - 1];
    // console.log("LAST STEP" c);
    let inputs = tf.tensor([[currStep]]);
    let model = this.state.model;
    console.log("Model: ", model);
    let ANSWER = model.predict(inputs);
    console.log("ANSWER: ", ANSWER);
    ANSWER.print();
    // let inputs = tf.tensor2d([[0, 1, 1]]);

    //PREDICTION!
    // let trainedmodel = this.load();
    // console.log("TRAINED MODEL", trainedmodel);
  }

  async load() {
    let myStorage = window.localStorage;
    let trainedmodel = await tf.loadLayersModel(`localstorage://${myStorage}`);
    console.log("LOADED: ", trainedmodel);
  }

  stop() {
    // console.log("you clicked stop!");
    this.setState({
      done: true
    });
  }

  handleMove(pacmodel, state) {
    console.log(
      "here is the pacmodel: ",
      pacmodel,
      "here is the state: ",
      state
    );
  }

  // handleMove(pacmodel, state) {
  //   let whatever = () => {
  //     if (this.props) {
  //       console.log("inside the IF");
  //       let action = 0;
  //       const prediction = pacmodel.predict(
  //         tf.tensor([this.stateToVector[state]])
  //       );

  //       const predictionPromise = prediction.data();

  //       predictionPromise.then(result => console.log("RESULT: ", result));
  //       //predict function returns a tensor we get data promise as result
  //     }
  //   };
  //   return whatever;
  // }

  //training
  //call inputLAyer method on game class, gives us the food array, access also from state the position of pacman
  //   async function trainModel() {
  //     await model.fit;
  //   }
  // }

  stateToVector() {
    return [
      ...this.props.player.position,
      ...this.props.food.map(food => +food.eaten)
    ];
  }

  render() {
    // console.log("S2V: ", this.stateToVector());
    // console.log("PLAYER", this.props.player);
    // console.log("FOOD", this.props.food);
    return (
      <div>
        <button onClick={this.stop}>STOP</button>;
        <button onClick={this.handleEpisode}>EPISODE</button>
        <button onClick={this.trainerCaller}>Train</button>
        <button onClick={this.getTrainEpisode}>ysTrainingData</button>
        <button onClick={this.save}> SAVE</button>
        <button onClick={this.load}>LOAD</button>
      </div>
    );
  }
}
