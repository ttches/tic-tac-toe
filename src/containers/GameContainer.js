import React, { Component } from 'react';

import Game from '../components/Game.js';

export default class GameCotainer extends Component {
  constructor() {
    super();
    this.handleAIChange = this.handleAIChange.bind(this);
    this.handlePlayersChange = this.handlePlayersChange.bind(this);
    this.handleRestartGame = this.handleRestartGame.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.state = {
      //AI has 3 difficulty settings.
      AI: 'master',
      //Dictates if the AI plays first or second, X always plays first. If null, two players can play
      AITurn: 'O',
      players: '1',
      //If false, a game has ended and empty game tiles cannot be played
      playing: true,
      /*Restart is a number because I didn't know how else to change
      the BoardContainer's state from GameContainer without comparing a
      change in BoardContainer's props.  I could have moved the board values
      to GameContainer's state but I think it belongs with the board*/
      restart: 0
    }
  }

  handleAIChange(e) {
    const AI = e.target.value;
    this.setState({
      ...this.state,
      AI
    })
  }
  /*I wanted this to just add and remove a neon glow from the AI Options h1 classList
  but I couldn't make the radio buttons work without a change of state*/
  handlePlayersChange(e) {
    const players = e.target.value;
    this.setState({
      ...this.state,
      players,
      restart: this.state.restart + 1
    });
  }

  handleRestartGame() {
    console.log('works');
    this.setState({
      ...this.state,
      playing: true,
      restart: this.state.restart + 1
    });
  }

  stopPlaying() {
    this.setState({
      ...this.state,
      playing: false
    });
  }

  render() {
    const {AI, AITurn, players, playing, restart} = this.state;
    return (
      <Game
        AI={AI}
        AITurn={(players === '1') ? AITurn : null}
        onAIChange={this.handleAIChange}
        onPlayersChange={this.handlePlayersChange}
        onRestartGame={this.handleRestartGame}
        players={players}
        playing={playing}
        restart={restart}
        stopPlaying={this.stopPlaying}
      />
    );
  }
}
