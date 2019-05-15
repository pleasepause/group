import React, { Component } from 'react';
import Molly from './molly';
const initialState = {
  monsters: [
    {
      id: 'monster-red',
      position: [12.5, 15],
      startingPosition: [12.5, 15],
      eatingTime: 0,
      color: 'red'
    },
    {
      id: 'monster-cyan',
      position: [10.5, 15],
      startingPosition: [10.5, 15],
      color: 'cyan'
    },
    {
      id: 'monster-orange',
      position: [14.5, 15],
      startingPosition: [14.5, 15],
      color: 'darkorange'
    },
    {
      id: 'monster-pink',
      position: [12.5, 17],
      startingPosition: [12.5, 17],
      color: 'pink'
    }
  ],
  startGame: false
};
export default class Pacman extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // // console.log(this.nuPosition);
    // window.addEventListener('keydown', this.onKey);
    // this.timers.start = setTimeout(() => {
    //   this.setState({ stepTime: Date.now() });
    //   this.step();
    // }, 1);
    // this.inputLayer();
    // // console.log(this.inputLayer());
    // // this.chooseRandom();
  }

  handleClick() {
    document.getElementById('molly').style.display = 'none';
    this.setState({
      startGame: true
    });
  }

  render() {
    // const monsters = this.state.monsters.map(({ id, ...monster }) => (
    //   <Monster key={id} {...monster} />
    // ));
    return (
      <div className="pacman">
        {/* {monsters} */}

        <img src={window.location.origin + 'cyan-ghost-ghost.png'} />
        <button onClick={this.handleClick} id="molly">
          Start Game
        </button>
        {this.state.startGame && <Molly />}
      </div>
    );
  }
}
