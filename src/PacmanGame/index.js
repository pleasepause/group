import React, { Component } from "react";
import { EAST, NORTH, WEST, SOUTH } from "./constants";
import getInitialState from "./state";
import { animate, changeDirection } from "./gameFunctions";
import Board from "./components/Board/board";
import Scores from "./components/Score";
import AllFood from "./components/AllFoods";
import Monster from "./components/Monsters";
import Player from "./components/Player";


export default class Pacman extends Component {
  constructor(props) {
    super(props);


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
    }, 3000);

  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKey);

    clearTimeout(this.timers.start);
    clearTimeout(this.timers.animate);
  }
  step() {
    const result = animate(this.state);

    this.setState(result);

    clearTimeout(this.timers.animate);
    this.timers.animate = setTimeout(() => this.step(), 20);
  }
  changeDirection(direction) {
    this.setState(changeDirection(this.state, { direction }));
  }


  inputLayer() {
    // console.log("INSIDE InputLayer!", this.state.food);
    let coordinates = this.state.food.map(food => food.position);
    return coordinates;
  }


  render() {
    const { onEnd, ...otherProps } = this.props;

    const props = { gridSize: 12, ...otherProps };

    const monsters = this.state.monsters.map(({ id, ...monster }) => (
      <Monster key={id} {...props} {...monster} />
    ));

    return (
      <div className="pacman">
        <Board {...props} />
        <Scores score={this.state.score} lost={this.state.lost} />
        <AllFood {...props} food={this.state.food} />
        {monsters}
        <Player
          {...props}
          {...this.state.player}
          lost={this.state.lost}
          onEnd={onEnd}
        />

        <DeepQ food={this.state.food} player={this.state.player} />

      </div>
    );
  }
}

