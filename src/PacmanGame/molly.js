import React, { Component } from 'react';
import {
  EAST,
  NORTH,
  WEST,
  SOUTH,
  mEAST,
  mNORTH,
  mSOUTH,
  mWEST
} from './constants';
import getInitialState from './state';
import {
  animate,
  changeDirection,
  changeMonsterDirectionRed,
  changeMonsterDirectionPink,
  changeMonsterDirectionCyan
} from './gameFunctions';

import { getNewPosition } from './gameFunctions/movement';
import DeepQ from '../tensorFlow/tensors';
import Board from './components/Board/board';
import Scores from './components/Score';
import AllFood from './components/AllFoods';
import Monster from './components/Monsters';
import Player from './components/Player';

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
    this.toggleSwitcher = this.toggleSwitcher.bind(this);
    this.switchRed = this.switchRed.bind(this);
    this.switchCyan = this.switchCyan.bind(this);
    this.switchPink = this.switchPink.bind(this);
    this.onKey = evt => {
      if (!this.state.controlToggle) {
        if (evt.key === 'ArrowRight') {
          return this.changeDirection(EAST);
        }
        if (evt.key === 'ArrowUp') {
          return this.changeDirection(NORTH);
        }
        if (evt.key === 'ArrowLeft') {
          return this.changeDirection(WEST);
        }
        if (evt.key === 'ArrowDown') {
          return this.changeDirection(SOUTH);
        }
        if (evt.key === 'd') {
          return this.changeDirection(mEAST);
        }
      }
      if (this.state.controlRed) {
        if (evt.key === 'd') {
          return this.changeMonsterDirectionRed(mEAST);
        }
        if (evt.key === 'w') {
          return this.changeMonsterDirectionRed(mNORTH);
        }
        if (evt.key === 'a') {
          return this.changeMonsterDirectionRed(mWEST);
        }
        if (evt.key === 's') {
          return this.changeMonsterDirectionRed(mSOUTH);
        }
      }
      if (this.state.controlPink) {
        if (evt.key === 'd') {
          return this.changeMonsterDirectionPink(mEAST);
        }
        if (evt.key === 'w') {
          return this.changeMonsterDirectionPink(mNORTH);
        }
        if (evt.key === 'a') {
          return this.changeMonsterDirectionPink(mWEST);
        }
        if (evt.key === 's') {
          return this.changeMonsterDirectionPink(mSOUTH);
        }
      }
      if (this.state.controlCyan) {
        if (evt.key === 'd') {
          return this.changeMonsterDirectionCyan(mEAST);
        }
        if (evt.key === 'w') {
          return this.changeMonsterDirectionCyan(mNORTH);
        }
        if (evt.key === 'a') {
          return this.changeMonsterDirectionCyan(mWEST);
        }
        if (evt.key === 's') {
          return this.changeMonsterDirectionCyan(mSOUTH);
        }
      }
      if (evt.key === '-') {
        return this.toggleSwitcher();
      }
      if (evt.key === '1') {
        return this.switchRed();
      }
      if (evt.key === '2') {
        return this.switchCyan();
      }
      if (evt.key === '3') {
        return this.switchPink();
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
    window.addEventListener('keydown', this.onKey);

    this.timers.start = setTimeout(() => {
      this.setState({ stepTime: Date.now() });

      this.step();
    }, 1);

    this.inputLayer();
    // console.log(this.inputLayer());
    // this.chooseRandom();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKey);

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
      console.log('WERE DONE');
      clearTimeout(this.timers.start);
    }
  }

  changeDirection(direction) {
    // console.log(this.state);
    if (0 <= direction <= 3) {
      this.setState(changeDirection(this.state, { direction }));
    }

    // console.log(this.state);
  }

  changeMonsterDirectionRed(direction) {
    this.setState(changeMonsterDirectionRed(this.state, { direction }));
  }
  changeMonsterDirectionCyan(direction) {
    this.setState(changeMonsterDirectionCyan(this.state, { direction }));
  }
  changeMonsterDirectionPink(direction) {
    this.setState(changeMonsterDirectionPink(this.state, { direction }));
  }
  actionMaker() {}

  inputLayer() {
    // console.log("INSIDE InputLayer!", this.state.food);
    let coordinates = this.state.food.map(food => food.position);
    return coordinates;
  }

  toggleSwitcher() {
    !this.state.controlToggle
      ? this.setState({
          controlToggle: true
        })
      : this.setState({
          controlToggle: false
        });
  }
  switchRed() {
    !this.state.controlRed
      ? this.setState({
          controlRed: true
        })
      : this.setState({
          controlRed: false
        });
  }
  switchPink() {
    !this.state.controlPink
      ? this.setState({
          controlPink: true
        })
      : this.setState({
          controlPink: false
        });
  }
  switchCyan() {
    !this.state.controlCyan
      ? this.setState({
          controlCyan: true
        })
      : this.setState({
          controlCyan: false
        });
  }
  chooseRandom() {
    // setTimeout(() => {
    //   let second = new Date().getTime() / 1000;
    //   return second;
    // }, 5000);
    let second = new Date().getTime() / 1000;
    let diff = Math.floor(second - this.currentSeconds) % 5;

    console.log('Difference between Second and initial Second: ', diff);
    if (this.state.score % 7 === 0 || diff === 0) {
      // this.changeDirection(Math.floor(Math.random() * z4));
      this.changeDirection(diff - 1 > 0 ? diff - 1 : 0);
      console.log('this is the direction', this.state.player.direction);
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
    // console.log(this.state);
    const { onEnd, ...otherProps } = this.props;

    const props = { gridSize: 12, ...otherProps };

    const monsters = this.state.monsters.map(({ id, ...monster }) => (
      <Monster
        key={id}
        {...props}
        {...monster}
        toggle={this.state.controlToggle}
      />
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
        <button onClick={this.pause}>PAUSE</button>;
      </div>
    );
  }
}
