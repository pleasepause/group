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
    this.state = getInitialState();
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
    window.addEventListener("keydown", this.onKey);

    this.timers.start = setTimeout(() => {
      this.setState({ stepTime: Date.now() });

      this.step();
    }, 500);
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

  reset() {
    this.state = getInitialState();
  }

  pause() {
    this.setState({
      running: false
    });
  }

  render() {
    const { onEnd, ...otherProps } = this.props;

    const props = { gridSize: 12, ...otherProps };
    if (this.state.lost === true) {
      this.reset();
    }

    return (
      <div className="pacman">
        <Board {...props} />
        <Scores score={this.state.score} lost={this.state.lost} />
        <AllFood {...props} food={this.state.food} />
        {/* {monsters} */}
        <Monster {...props} {...this.state.monsters[0]} />
        {/* <Monster key={this.state.monsters[0].id} {...props} /> */}
        <Player
          {...props}
          {...this.state.player}
          lost={this.state.lost}
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

        {/* <button onClick={this.pause}>PAUSE</button>; */}
      </div>
    );
  }
}
