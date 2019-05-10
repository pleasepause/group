import * as tf from "@tensorflow/tfjs";
import React, { Component } from "react";

export default class DeepQ extends Component {
  constructor(props) {
    super(props);
    let firstTime = true;

    this.stateToVector = this.stateToVector.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {
    this.handleMove(this.props.food, this.props.player);
  }

  handleReset() {
    if (firstTime) {
      firstTime = false;
      const pacmodel = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [246], units: 6, activation: "relu" }),
          tf.layers.dense({ units: 4, activation: "relu" })
        ]
      });

      const sgdOpt = tf.train.sgd(0.1);

      pacmodel.compile({
        optimizer: sgdOpt,
        loss: "meanSquaredError"
      });

      pacmodel.training = {
        inputs: [],
        labels: []
      };
    } else {
      pacmodel.fit(
        tf.tensor(pacmodel.training.inputs),
        tf.tensor(pacmodel.training.labels)
      );
    }
  }

  handleMove(pacmodel, state) {
    let whatever = () => {
      if (this.props) {
        console.log("inside the IF");
        let action = 0;
        const prediction = pacmodel.predict(
          tf.tensor([this.stateToVector[state]])
        );

        const predictionPromise = prediction.data();

        predictionPromise.then(result => console.log("RESULT: ", result));
        //predict function returns a tensor we get data promise as result
      }
    };
    return whatever;
  }

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
    return <div>hi!</div>;
  }
}
