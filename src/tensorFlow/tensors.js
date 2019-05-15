import * as tf from "@tensorflow/tfjs";
import React, { Component } from "react";
import eps, { epsYs } from "./trainingepisodes";

export let completedEpisode;

export default class DeepQ extends Component {
  constructor(props) {
    super(props);
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
      model: [],
      eating: false,
      isPaused: false
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
    this.togglePause = this.togglePause.bind(this);
    // this.actionInterval = this.actionInterval.bind(this);
  }

  componentDidMount() {
    // this.train();
    // setTimeout(() => this.setup(), 6000);
    this.setup();
  }

  togglePause() {
    this.setState({
      isPaused: !this.state.isPaused
    });
  }

  setup() {
    let actionInterval;
    actionInterval = setInterval(() => {
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
      // let newPrevCumulativeReward = this.

      if (this.state.isPaused) {
        clearInterval(actionInterval);
      }
      //add to our replay buffer
      if (this.state.episode.length > 2) {
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
            this.state.currPosition[0],
            this.state.currPosition[1]
          ]
        ]
      });
      this.nextGuess();
    }, 220);

    // setTimeout(() => clearInterval(actionInterval), 5000);
  }

  scoreTrack() {
    setTimeout(() => {
      this.state.scoreTracking = false;
      let { currScore, prevScore, prevPosition, currPosition } = this.state;
      if (
        prevScore === currScore &&
        prevPosition.join() === currPosition.join()
      ) {
        // console.log("YOU TRIGGERED THE CONDITIONAL!!!!");
        this.props.reset();
      }
    }, 5000);
  }

  act(tens) {
    // console.log("INSIDE OF ACT METHOD!", tens.dataSync());
    let options = tens.dataSync();
    let resultIdx = options.indexOf(options.reduce((a, c) => Math.max(a, c)));
    // console.log("RESULTIDX: ", resultIdx);
    //make a random number and if it's beneath (or higher than) epsilon than disregard the output and choose a random action
    this.props.player.direction = resultIdx;
    // this.step(resultIdx);
  }

  handleEpisode() {
    console.log("EPISODE:", this.state.episode);
  }
  trainerCaller() {
    //taking an array of completed episode of steps, an iterating through and calling train on each step.
    for (let i = 0; i < this.state.episode.length; i++) {
      console.log("current training step:", this.state.episode[i]);
      console.log(Array.isArray(this.state.episode[i]));
      this.train(this.state.episode[i], i);
    }
  }

  async train(step, i) {
    //training input step
    let xs = tf.tensor([[step]]);
    xs.print();

    //determine what the one-hot output target should be given the input step
    let ys = tf.tensor([[epsYs(this.state.episode)[i]]]);
    ys.print();

    if (this.state.model.length > 0) {
      await pacmodel
        .fit(xs, ys, {
          epochs: 1,
          shuffle: true,
          callbacks: {
            onEpochEnd: () => console.log(pacmodel)
          }
        })
        .then(results => {
          console.log("RESULTS: ", results);
        });
      //make the pacmodel accessible via local state
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
    } else {
      //create the model
      const pacmodel = tf.sequential({});

      pacmodel.add(
        tf.layers.dense({
          inputShape: [1, 5],
          units: 6,
          activation: "relu"
        })
      );
      pacmodel.add(tf.layers.dense({ units: 4, activation: "softmax" }));

      const sgdOpt = tf.train.sgd(0.1);

      pacmodel.compile({
        optimizer: sgdOpt,
        loss: "meanSquaredError"
      });
      // pacmodel.summary();

      //TRAIN THE MODEL
      await pacmodel
        .fit(xs, ys, {
          epochs: 1,
          shuffle: true,
          callbacks: {
            onEpochEnd: () => console.log(pacmodel)
          }
        })
        .then(results => {
          console.log("RESULTS: ", results);
        });

      //make the pacmodel accessible via local state
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
      // let loadedD = await tf.loadLayersModel(`localstorage://${myStorage}`);
      // console.log("LOADED: ", loadedD);
    }
  }

  //nextGuess is called at every step of the action interval:
  nextGuess() {
    //now that model is trained we can take in each current step and pass into predict and make move based on output
    let currStep = this.state.episode[this.state.episode.length - 1];
    let inputs = tf.tensor([[currStep]]);
    let model = this.state.model;
    // console.log("Model: ", model);
    // model.summary();
    let ANSWER = model.predict(inputs);
    ANSWER.print();

    //pass the prediction ANSWER to the act method
    this.act(ANSWER);
  }

  async load() {
    let myStorage = window.localStorage;
    let trainedmodel = await tf.loadLayersModel(`localstorage://${myStorage}`);
    console.log("LOADED: ", trainedmodel);
    this.setState({});
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

  stateToVector() {
    return [
      ...this.props.player.position,
      ...this.props.food.map(food => +food.eaten)
    ];
  }

  render() {
    return (
      <div>
        <button onClick={this.stop}>STOP</button>;
        <button onClick={this.handleEpisode}>EPISODE</button>
        <button onClick={this.trainerCaller}>Train</button>
        <button onClick={this.getTrainEpisode}>ysTrainingData</button>
        <button onClick={this.save}> SAVE</button>
        <button onClick={this.load}>LOAD</button>
        <button onClick={this.togglePause}>TogglePause</button>
      </div>
    );
  }
}
