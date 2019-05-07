import * as tf from '@tensorflow/tfjs'
import 

const model = tf.sequential();
model.add(tf.layers.dense({}))


/*
The Agent has 4 inputs
    Up
    Down
    Left
    Right

The Environment has only some things that matter.

    When th
*/

export class PacMan {
    constructor() {

    }
    getStateTensor(){
        return tf.tensor2d()
    }
}