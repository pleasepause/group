import React, { Component } from "react";
import { EAST, NORTH, WEST, SOUTH } from "./constants";
import getInitialState from "./state";
import {
  animate,
  changeDirection,
  changeMonsterDirection
} from "./gameFunctions";
// import { changeMonsterDirection } from "./gameFunctions/monster";

import { getNewPosition } from "./gameFunctions/movement";

import Board from "./components/Board/board";
import Scores from "./components/Score";
import AllFood from "./components/AllFoods";
import Monster from "./components/Monsters";
import Player from "./components/Player";
import DeepQ from "../tensorFlow/tensors";

export default class Pacman extends Component {
  constructor(props) {
    super(props);

    this.inputLayer = this.inputLayer.bind(this);
    this.state = getInitialState();
    this.nuPosition = getNewPosition(
      this.state.player.position,
      this.state.player.direction,
      30,
      new Date().getTime()
    );

    this.state.chooseRandom = this.chooseRandom.bind(this);
    this.currentSeconds = new Date().getTime() / 1000;
    this.reset = this.reset.bind(this);
    this.pause = this.pause.bind(this);

    this.onKey = evt => {
      if (evt.key === "ArrowRight") {
        return this.changeDirection(EAST);
      }
      if (evt.key === "ArrowUp") {
        return this.changeDirection(NORTH);
      }
      if (evt.key === "ArrowLeft") {
        return this.changeDirection(WEST);
      }
      if (evt.key === "ArrowDown") {
        return this.changeDirection(SOUTH);
      }
      if (evt.key === "d") {
        return this.changeMonsterDirection(EAST);
      }
      if (evt.key === "w") {
        return this.changeMonsterDirection(NORTH);
      }
      if (evt.key === "a") {
        return this.changeMonsterDirection(WEST);
      }
      if (evt.key === "s") {
        return this.changeMonsterDirection(SOUTH);
      }
      if (evt.key === "1") {
        this.state.monsters[0].playerControlled = true;
        console.log(this.state);
      }

      return null;
    };

    this.timers = {
      start: null,
      animate: null
    };
  }

  componentDidMount() {
    // console.log(this.nuPosition);
    window.addEventListener("keydown", this.onKey);

    this.timers.start = setTimeout(() => {
      this.setState({ stepTime: Date.now() });

      this.step();
    }, 500);

    this.inputLayer();
    // console.log(this.state);
    // this.chooseRandom();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKey);

    clearTimeout(this.timers.start);
    clearTimeout(this.timers.animate);
  }
  step() {
    if (this.state.running) {
      const result = animate(this.state);

      this.setState(result);

      clearTimeout(this.timers.animate);
      this.timers.animate = setTimeout(() => this.step(), 20);
    } else {
      // console.log("WERE DONE");
      clearTimeout(this.timers.start);
    }
  }

  changeDirection(direction) {
    this.setState(changeDirection(this.state, { direction }));
  }

  changeMonsterDirection(direction) {
    console.log("ghost is changing direction", this.state);
    // this.setState(changeMonsterDirection(this.state, { direction }));
  }

  inputLayer() {
    // console.log("INSIDE InputLayer!", this.state.food);
    let coordinates = this.state.food.map(food => food.position);
    return coordinates;
  }

  chooseRandom() {
    // setTimeout(() => {
    //   let second = new Date().getTime() / 1000;
    //   return second;
    // }, 5000);
    let second = new Date().getTime() / 1000;
    let diff = Math.floor(second - this.currentSeconds) % 5;

    // console.log("Difference between Second and initial Second: ", diff);
    if (this.state.score % 7 === 0 || diff === 0) {
      // this.changeDirection(Math.floor(Math.random() * z4));
      this.changeDirection(diff - 1 > 0 ? diff - 1 : 0);
      // console.log("this is the direction", this.state.player.direction);
    }
  }

  reset() {
    this.state = getInitialState();
  }

  pause() {
    this.setState({
      running: false
    });
  }

  render() {
<<<<<<< HEAD
    // console.log("sdfshjdfsdjkhfkjdfh", this.state);
=======
>>>>>>> master
    const { onEnd, ...otherProps } = this.props;

    const props = { gridSize: 12, ...otherProps };
    // console.log("stateinrender", this.state);
    // console.log("fwehucjsk", this.props);
    // const monsters = this.state.monsters.map(({ id, ...monster }) => (
    //   <Monster key={id} {...props} {...monster} />
    // ));

    return (
      <div className="pacman">
        <Board {...props} />
        <Scores score={this.state.score} lost={this.state.lost} />
        <AllFood {...props} food={this.state.food} />
        {/* {monsters} */}
        <Monster
          {...props}
          {...this.state.monsters[0]}
          nuPosition={this.nuPosition}
        />
        {/* <Monster key={this.state.monsters[0].id} {...props} /> */}
        <Player
          {...props}
          {...this.state.player}
          lost={this.state.lost}
          nuPosition={this.nuPosition}
          onEnd={onEnd}
        />
        <DeepQ
          food={this.state.food}
          player={this.state.player}
          score={this.state.score}
          reset={this.reset}
          running={this.state.running}
          changeDirection={this.changeDirection}
          lost={this.state.lost}
        />
<<<<<<< HEAD
        <button onClick={this.pause}>PAUSE</button>;
=======

        {/* <button onClick={this.pause}>PAUSE</button>; */}

>>>>>>> master
      </div>
    );
  }
}
