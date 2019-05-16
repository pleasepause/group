import React, { Component } from 'react';

import Molly from './molly';

export default class Pacman extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startGame: false
    };
    this.handleGame = this.handleGame.bind(this);
  }

  handleGame() {
    this.setState({
      startGame: true
    });
    document.getElementById('hideme').style.display = 'none';
  }
  render() {
    return (
      <div>
        <button onClick={this.handleGame} id="hideme">
          Start Game
        </button>
        {this.state.startGame && <Molly />}
      </div>
    );
  }
}
