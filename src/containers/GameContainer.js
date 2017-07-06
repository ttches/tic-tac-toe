import React, { Component } from 'react';

import Game from '../components/Game.js';

export default class GameCotainer extends Component {
  constructor() {
    super();
    this.handlePlayersChange = this.handlePlayersChange.bind(this);
    this.handleRestartGame = this.handleRestartGame.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.state = {
      //AI has 3 difficulty settings. If null, the AI will not run allowing two people to play
      AI: 'master',
      //Dictates if the AI plays first or second, X always plays first
      AITurn: 'O',
      /*I need to give the radio buttons a state or they don't function, and
      I don't want them to update the state of the current game so I have nextGame
      to store the changes until a new game starts*/
      nextGame: {AITurn: 'O', AI: 'master'},
      //I need to keep track of players so AI Options glow effect can be turned on and off but ideally this wouldn't exist
      players: '1',
      //If false, a game has ended and empty game tiles cannot be played
      playing: false,
      /*Restart is a number because I didn't know how else to change
      the BoardContainer's state from GameContainer without comparing a
      change in BoardContainer's props.  I could have moved the board values
      to GameContainer's state but I think it belongs with the board*/
      restart: 0
    }
  }

  /*I wanted this to just add and remove a neon glow from the AI Options h1 classList
  but I couldn't make the radio buttons work without a change of state*/
  handlePlayersChange(e) {
    this.setState({
      ...this.state,
      players: e.target.value
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
        AITurn={AITurn}
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
