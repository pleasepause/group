import * as tf from "@tensorflow/tfjs";
import React, { Component } from "react";
import { EAST, NORTH, WEST, SOUTH } from "../PacmanGame/constants";

const dummyOutputs = [
  [0.6, 0.1, 0.1, 0.2], //EAST
  [0.05, 0.65, 0.1, 0.2], //NORH
  [0.15, 0.25, 0.4, 0.2], //WEST
  [0.02, 0.18, 0.1, 0.7] //SOUTH
];

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
      currPosition: this.props.player.position
    };

    this.stateToVector = this.stateToVector.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.scoreTrack = this.scoreTrack.bind(this);
    this.handleEpisode = this.handleEpisode.bind(this);
    this.train = this.train.bind(this);
    this.setup = this.setup.bind(this);
    this.act = this.act.bind(this);
    // this.actionInterval = this.actionInterval.bind(this);
  }

  componentDidMount() {
    // console.log("PROPS IN TENSORS.JS", this.props);
    window.addEventListener(
      "keydown",
      this.handleMove(this.props.food, this.props.player)
    );
    this.setup();
    // actionInterval();

    // setInterval(
    //   () =>
    //     console.log(
    //       "player direction",
    //       this.props.player.direction,
    //       "next direction",
    //       this.props.player.nextDirection
    //     ),
    //   200
    // );

    // this.handleMove(this.props.food, this.props.player);
  }

  componentDidUpdate() {
    // console.log(
    //   "player direction",
    //   this.props.player.direction,
    //   "next direction",
    //   this.props.player.nextDirection
    // );
  }

  setup() {
    let actionInterval;
    actionInterval = setInterval(() => {
      // console.log("SCORE: ", this.props.score);
      console.log("LOCAL STATE: ", this.state);
      // console.log("LOCAL PROPS", this.props.score);
      // if (!this.state.prevScore) {
      //   this.setState({
      //     // ...this.state,
      //     prevScore: this.props.score
      //   });
      // }
      //  else

      let newPrev = this.state.currScore;
      let newPrevAction = this.state.currAction;
      let newPrevPosition = this.state.currPosition;
      this.setState({
        currScore: this.props.score,
        prevScore: newPrev
      });
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
        if (this.state.currAction === this.state.prevPosition) {
        }
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
            this.state.currAction,
            this.state.currentReward,
            this.state.cumulativeReward
          ]
        ]
      });
      let randomIdx = Math.floor(Math.random() * 4);
      let dummyArr = dummyOutputs[randomIdx];
      this.act(dummyArr);
    }, 220);

    setTimeout(() => clearInterval(actionInterval), 5000);
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
        console.log("YOU TRIGGERED THE CONDITIONAL!!!!");
        this.props.reset();
        // this.props.pause();
      }
    }, 1000);
  }

  act(arr) {
    // console.log("Passed in Arr: ", arr);
    let resultIdx = arr.indexOf(arr.reduce((a, c) => Math.max(a, c)));
    // console.log("RESULTIDX: ", resultIdx);
    this.props.player.direction = resultIdx;
  }

  step() {
    //take in the chosen action (0-3), determine what the reward and newstate would be given this action. also save the curr state as prevstate.
    //in order to determine what the reward and next state are, we need to then include the player.position as a feature for input.
    //if we know the player position, we can then predict their position for the next step given their direction...we can use food array to determine if they're landing on an eaten vs uneaten pellet, and can use prev position vs currposition to determine if they hit a wall
  }

  handleEpisode() {
    console.log("EPISODE:", this.state.episode);
  }

  async train() {
    const xs = tf.tensor([this.state.episode]);
    // const xs = tf.tensor([[0, 0, 0], [0, 0, 0]]); //shape of 1,3
    // console.log("TEST INPUT: ", xs);
    xs.print();
    const ys = tf.tensor([[0, 0, 1, 0], [0, 0, 1, 0]]); //1 example of 4 things 1,4
    ys.print();
    const pacmodel = tf.sequential({});

    pacmodel.add(
      tf.layers.dense({
        inputShape: [3],
        units: 20,
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

    let response = await pacmodel.fit(xs, ys);
    // .then(result => console.log("RESULT! ", result));
    console.log("RESPONSE: ", response.data);
    response.print();
    // const input =  this.state.episode

    await pacmodel.save("/Users/logantakahashi/Desktop/Immersive/Week11");
  }

  // handleReset() {
  //   console.log("CHECK if handleReset gets called on mount");
  //   if (firstTime) {
  //     firstTime = false;
  //     const pacmodel = tf.sequential({
  //       layers: [
  //         tf.layers.dense({ inputShape: [1], units: 6, activation: "relu" }),
  //         tf.layers.dense({ units: 4, activation: "softmax" })
  //       ]
  //     });

  //     const sgdOpt = tf.train.sgd(0.1);

  //     pacmodel.compile({
  //       optimizer: sgdOpt,
  //       loss: "meanSquaredError"
  //     });

  //     pacmodel.training = {
  //       inputs: [],
  //       labels: []
  //     };
  //   } else {
  //     pacmodel.fit(
  //       tf.tensor(pacmodel.training.inputs),
  //       tf.tensor(pacmodel.training.labels)
  //     );
  //   }
  // }

  // save(){
  // }

  stop() {
    console.log("you clicked stop!");
    clearInterval(actionInterval);
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
        <button onClick={this.train}>Train</button>
      </div>
    );
  }
}
