import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.checkWinner = this.checkWinner.bind(this);
    this.getOpenTiles = this.getOpenTiles.bind(this);
    this.handleAITurn = this.handleAITurn.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.miniMax = this.miniMax.bind(this);
    this.playTile = this.playTile.bind(this);
    this.toggleTurn = this.toggleTurn.bind(this);
    this.state = {
      AI: 'O',
      AISkill: 'master', //manage this with a prop
      playing: true, //manage this with a prop
      turn: 'X',
      values: Array(9).fill(null)
    }
  }

  //handles the users move
  handleTileClick(e) {
    //If it's the computer's turn, return
    if (this.state.AI === this.state.turn || this.state.playing === false) return;
    const index = e.target.dataset.index;
    //If the tile is occupied, return
    if (this.state.values[index] ) return;
    this.playTile(index);
  };

  handleAITurn() {
    const delay = (Math.floor(Math.random() * 2) + 0.5) * 1000;
    const { AISkill } = this.state
    //chooses master, basic, or intermediate AI
    const fn = (AISkill === 'master')
      ? this.masterAI.bind(this)
      : (AISkill === 'basic')
        ? this.basicAI.bind(this)
        : console.log
    setTimeout(() => fn(), delay);
  }

  basicAI() {
    //plays random tile
    console.log(this)
    const openTiles = this.getOpenTiles();
    const randomTile = openTiles[Math.floor(Math.random() * openTiles.length)];
    this.playTile(randomTile)
  }

  masterAI() {
    const openTiles = this.getOpenTiles();
    //minimax possible moves
    const tileScores =
      openTiles.map((tile) => {
        let newValues = [...this.state.values];
        newValues[tile] = this.state.turn;
        return this.miniMax(newValues, this.state.turn, this.state.turn);
      });
    //choses a random best move if more than one exist
    const bestTileScore = tileScores.reduce((accu, score) => (score > accu) ? score : accu, -11);
    const bestTileScores = tileScores.reduce((accu, score, i) => {
      if (score === bestTileScore) accu.push(i);
      return accu;
    }, []);
    const choiceIndex = bestTileScores[Math.floor(Math.random() * bestTileScores.length)];

    this.playTile(openTiles[choiceIndex]);
  }

  miniMax(values, turnState, AIturn) {
    const openTiles = this.getOpenTiles(values);
    turnState = this.toggleTurn(turnState);
    if (this.checkWinner(values)) {
      return (this.checkWinner(values) === AIturn) ? 10 : -10;
    }
    if(openTiles.length === 0) return 0;
    let scores = []

    for (let i = 0; i < openTiles.length; i++) {
      let newValues = [...values];
      newValues[openTiles[i]] = turnState;
      scores.push(this.miniMax(newValues, turnState, AIturn));
    }

    if (turnState === AIturn) {
      return scores.reduce((accu, score) => (score > accu) ? score : accu, -11)
    } else {
      return scores.reduce((accu, score) => (score < accu) ? score : accu, 11)
    }
  }

  playTile(tile) {
    let newValues = [...this.state.values];
    newValues[tile] = this.state.turn
    this.setState({
      ...this.state,
      values: newValues,
      turn: this.toggleTurn(this.state.turn)
    });
  }

  checkWinner(i = this.state.values) {
    if (i.slice(0, 3).every((value) => value === i[0] && i[0] !== null)) return i[0]
    if (i.slice(3, 6).every((value) => value === i[3] && i[3] !== null)) return i[3]
    if (i.slice(6, 9).every((value) => value === i[6] && i[6] !== null)) return i[6]
    if ([i[0], i[3], i[6]].every((value) => value === i[0] && i[0] !== null)) return i[0]
    if ([i[1], i[4], i[7]].every((value) => value === i[1] && i[1] !== null)) return i[1]
    if ([i[2], i[5], i[8]].every((value) => value === i[2] && i[2] !== null)) return i[2]
    if ([i[0], i[4], i[8]].every((value) => value === i[0] && i[0] !== null)) return i[0]
    if ([i[2], i[4], i[6]].every((value) => value === i[2] && i[2] !== null)) return i[2]
    return false;
  }

  getOpenTiles(tiles = this.state.values) {
    return tiles.reduce((accu, value, i) => {
      if (value === null) {
        accu.push(i)
      }
      return accu;
    }, [])
  }

  toggleTurn(turn) {
    return (turn === 'X') ? 'O' : 'X';
  }

  componentDidUpdate() {
    if (this.checkWinner()) console.log(this.checkWinner());
    if (this.getOpenTiles().length === 0) {
      console.log('tie');

      //todo change playing state here
    }
    if (this.state.AI === this.state.turn && this.state.playing === true) { //change playing to a prop
      this.handleAITurn();
    }
  }

  render() {
    return (
      <Board
        values={this.state.values}
        onTileClick={this.handleTileClick}/>
    )
  }
}
