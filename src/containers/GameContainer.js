import React, { Component } from 'react';

import Game from '../components/Game.js';

export default class GameCotainer extends Component {
  constructor() {
    super();
    this.stopPlaying = this.stopPlaying.bind(this);
    this.state = {
      AI: 'master',
      AITurn: null,
      playing: true,
    }
  }

  stopPlaying() {
    this.setState({
      ...this.state,
      playing: false
    });
  }

  render() {
    const {AI, AITurn, playing} = this.state;
    return (
      <Game
        AI={AI}
        AITurn={AITurn}
        playing={playing}
        stopPlaying={this.stopPlaying}
      />
    );
  }
}
