/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from "@tensorflow/tfjs";
import { SGDOptimizer } from "@tensorflow/tfjs";
import Pacman from "../PacmanGame";

export function setup() {
  let instance = new Pacman();
  let state = instance.getInitialState();
}

export function createDeepQNetwork(h, w, numActions) {
  if (!(Number.isInteger(h) && h > 0)) {
    throw new Error(`Expected height to be a positive integer, but got ${h}`);
  }
  if (!(Number.isInteger(w) && w > 0)) {
    throw new Error(`Expected width to be a positive integer, but got ${w}`);
  }
  if (!(Number.isInteger(numActions) && numActions > 1)) {
    throw new Error(
      `Expected numActions to be a integer greater than 1, ` +
        `but got ${numActions}`
    );
  }

  // console.log("INSIDE OF DQN file", state);
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [2], units: 6, activation: "relu" }),
      tf.layers.dense({ units: 3, activation: "softmax" })
    ]
  });

  const sgdOpt = tf.train.sgd(0.1);

  pac.model.compile({
    optimizer: sgdOpt,
    loss: "meanSquaredError"
  });

  pac.training = {
    inputs: [],
    labels: []
  };

  //training
  //call inputLAyer method on game class, gives us the food array, access also from state the position of pacman
  async function trainModel() {
    await model.fit;
  }

  // const input = tf.layers.dense({});

  // const model = tf.sequential();
  // model.add(
  //   tf.layers.conv2d({
  //     filters: 122,
  //     kernelSize: 4,
  //     strides: 1,
  //     activation: "relu",
  //     inputShape: [h, w, 2]
  //   })
  // );
  // model.add(
  //   tf.layers.conv2d({
  //     filters: 244,
  //     kernelSize: 4,
  //     strides: 1,
  //     activation: "relu"
  //   })
  // );
  // model.add(
  //   tf.layers.conv2d({
  //     filters: 244,
  //     kernelSize: 4,
  //     strides: 1,
  //     activation: "relu"
  //   })
  // );
  // model.add(tf.layers.flatten());
  // model.add(tf.layers.dense({ units: 244, activation: "relu" }));
  // model.add(tf.layers.dense({ units: numActions }));
  // return model;
}

/**
 * Copy the weights from a source deep-Q network to another.
 *
 * @param {tf.LayersModel} destNetwork The destination network of weight
 *   copying.
 * @param {tf.LayersModel} srcNetwork The source network for weight copying.
 */
export function copyWeights(destNetwork, srcNetwork) {
  destNetwork.setWeights(srcNetwork.getWeights());
}
