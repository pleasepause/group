import * as tf from "@tensorflow/tfjs";
import React, { Component } from "react";

export default class DeepQ extends Component {
  constructor(props) {
    super(props);
  }

  model() {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [2], units: 6, activation: "relu" }),
        tf.layers.dense({ units: 4, activation: "softmax" })
      ]
    });

    const sgdOpt = tf.train.sgd(0.1);

    model.compile({
      optimizer: sgdOpt,
      loss: "meanSquaredError"
    });

    model.training = {
      inputs: [],
      labels: []
    };

    //training
    //call inputLAyer method on game class, gives us the food array, access also from state the position of pacman
    async function trainModel() {
      await model.fit;
    }
  }

  stateToVector() {
    return [
      ...this.props.player.position,
      ...this.props.food.map(food => +food.eaten)
    ];
  }

  render() {
    console.log("PLAYER", this.props.player);
    console.log("FOOD", this.props.food);
    return <div>hi!</div>;
  }
}
