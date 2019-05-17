import * as tf from "@tensorflow/tfjs";
import React, { Component } from "react";
const epsYs = arr => {
  let ysArr = [];
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i][0]) {
      case 0:
        ysArr.push([0.4, 0.25, 0.25, 0.1]);
        break;
      case 1:
        ysArr.push([0.25, 0.4, 0.1, 0.25]);
        break;
      case 2:
        ysArr.push([0.25, 0.1, 0.4, 0.25]);
        break;
      case 3:
        ysArr.push([0.1, 0.25, 0.25, 0.4]);
    }
  }
  return ysArr;
};

export default class DeepQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      model: []
    };

    this.train = this.train.bind(this);
    this.act = this.act.bind(this);
    this.trainCallBack = this.trainCallBack.bind(this);
    this.load = this.load.bind(this);
    this.nextGuess = this.nextGuess.bind(this);
    this.createEpisode = this.createEpisode.bind(this);
  }

  componentDidMount() {
    console.log("hey this is props componentDidMount", this.props);
    createEpisode;
    setup();
  }

  componentWillUpdate() {}
  createEpisode(library) {
    let newEpisode = [
      ...newEpisode,
      [
        this.props.player.direction,
        this.state.currentReward,
        this.state.cumulativeReward,
        this.state.currPosition[0],
        this.state.currPosition[1]
      ]
    ];
    library.push(newEpisode);
  }
  // setup() {
  //   let actionInterval;
  //   actionInterval = setInterval(() => {
  //     let newPrev = this.state.currScore;
  //     let newPrevAction = this.state.currAction;
  //     let newPrevPosition = this.state.currPosition;
  //     this.setState({
  //       currScore: this.props.score,
  //       prevScore: newPrev
  //     });
  //     // let newPrevCumulativeReward = this.

  //     if (this.state.isPaused) {
  //       clearInterval(actionInterval);
  //     }
  //     //add to our replay buffer
  //     if (this.state.episode.length > 2) {
  //       let tuple = [
  //         this.state.episode[this.state.episode.length - 2],
  //         this.state.episode[this.state.episode.length - 1]
  //       ];
  //       this.state.replayBuffer.push(tuple, this.state.done);
  //     }

  //     if (!this.state.prevPosition) {
  //       this.setState({
  //         prevPosition: newPrevPosition,
  //         currPosition: this.props.player.position
  //       });
  //     } else {
  //       this.setState({
  //         prevPosition: newPrevPosition,
  //         currPosition: this.props.player.position
  //       });
  //     }
  //     // if (this.state.prevPosition.join() === this.state.currPosition.join()) {
  //     //   console.log("DO NOT STAND STILL!, -5 points");
  //     // }
  //     if (this.state.currScore === this.state.prevScore) {
  //       this.setState({
  //         currentReward: -1,
  //         cumulativeReward: this.state.cumulativeReward - 1
  //       });

  //       if (!this.state.scoreTracking) {
  //         this.setState({
  //           ...this.state,
  //           scoreTracking: true
  //         });
  //         //calling scoreTrack method
  //         this.scoreTrack();
  //       }
  //       //start a time for 60 secs, in callback function of timer, if this.state curr & prev scores are the same as when the timer started, then reset the game
  //     } else {
  //       this.setState({
  //         currentReward: 10,
  //         cumulativeReward: this.state.cumulativeReward + 10
  //       });
  //     }
  //     if (!this.state.prevAction) {
  //       this.setState({
  //         currAction: this.props.player.direction,
  //         prevAction: newPrevAction
  //       });
  //     }

  //     this.setState({
  //       episode: [
  //         ...this.state.episode,
  //         [
  //           this.props.player.direction,
  //           this.state.currentReward,
  //           this.state.cumulativeReward,
  //           this.state.currPosition[0],
  //           this.state.currPosition[1]
  //         ]
  //       ]
  //     });
  //     if (this.state.model.length > 0) {
  //       this.nextGuess();
  //     }
  //   }, 220);

  // }

  act(tensor) {
    let options = tensor.dataSync();
    let resultIdx = options.indexOf(options.reduce((a, c) => Math.max(a, c)));
    this.props.state.player.direction = resultIdx;
  }

  trainCallBack() {
    for (let i = 0; i < this.state.episode.length; i++) {
      console.log("current training step:", this.state.episode[i]);
      console.log(Array.isArray(this.state.episode[i]));
      this.train(this.state.episode[i], i);
    }
  }

  async train(step, i) {
    let states = tf.tensor([[step]]);
    states.print();

    let actions = tf.tensor([[epsYs(this.state.episode)[i]]]);
    actions.print();

    if (this.state.model.length > 0) {
      await pacmodel
        .fit(states, actions, {
          epochs: 1,
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
      let myStorage = window.localStorage;
      await pacmodel
        .save(`localstorage://${myStorage}`)
        .then(() => console.log("done saving"));
      tf.dispose({
        states,
        actions
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
        .fit(states, actions, {
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
        states,
        actions
      });
    }
  }

  nextGuess() {
    let currStep = this.state.episode[this.state.episode.length - 1];
    let inputs = tf.tensor([[currStep]]);
    let model = this.state.model;

    let ANSWER = model.predict(inputs);
    ANSWER.print();

    this.act(ANSWER);
  }

  async load() {
    let myStorage = window.localStorage;
    let trainedmodel = await tf.loadLayersModel(`localstorage://${myStorage}`);
    console.log("LOADED: ", trainedmodel);
    this.setState({});
  }

  render() {
    return (
      <div>
        <button onClick={this.trainerCaller}>Train</button>
        <button onClick={this.getTrainEpisode}>ysTrainingData</button>
        <button onClick={this.load}>LOAD</button>
        <button onClick={this.togglePause}>TogglePause</button>
      </div>
    );
  }
}
