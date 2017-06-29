import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.checkWinner = this.checkWinner.bind(this);
    this.getOpenTiles = this.getOpenTiles.bind(this);
    this.handleAITurn = this.handleAITurn.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.playTile = this.playTile.bind(this);
    this.toggleTurn = this.toggleTurn.bind(this);
    this.state = {
      AI: 'O',
      playing: true,
      turn: 'X',
      values: Array(9).fill(null)
    }
  }

  //handles the users move
  handleTileClick(e) {
    if (this.state.AI === this.state.turn || this.playing === false) return;  //If it's the computer's turn, return
    const index = e.target.dataset.index;
    if (this.state.values[index] ) return;  //If the tile is occupied, return
    this.playTile(index);
  };

  handleAITurn() {
    const delay = (Math.floor(Math.random() * 2) + 0.5) * 1000;
    const openTiles = this.getOpenTiles();
    const randomTile = openTiles[Math.floor(Math.random() * openTiles.length)];
    setTimeout(() => this.playTile(randomTile), delay)
  }

  playTile(tile) {
    let newValues = [...this.state.values];
    newValues[tile] = this.state.turn
    this.setState({
      ...this.state,
      values: newValues,
      turn: this.toggleTurn()
    });
  }

  checkWinner(i) {
    if (i === null) {
      i = this.state.values;
    }
    if (i.slice(0, 3).every((value) => value === i[0] && i[0] !== null)) return true
    if (i.slice(3, 6).every((value) => value === i[3] && i[3] !== null)) return true
    if (i.slice(6, 9).every((value) => value === i[6] && i[6] !== null)) return true
    if ([i[0], i[3], i[6]].every((value) => value === i[0] && i[0] !== null)) return true
    if ([i[1], i[4], i[7]].every((value) => value === i[1] && i[1] !== null)) return true
    if ([i[2], i[5], i[8]].every((value) => value === i[2] && i[2] !== null)) return true
    if ([i[0], i[4], i[8]].every((value) => value === i[0] && i[0] !== null)) return true
    if ([i[2], i[4], i[6]].every((value) => value === i[2] && i[2] !== null)) return true
  }

  getOpenTiles() {
    return this.state.values.reduce((accu, value, i) => {
      if (value === null) {
        accu.push(i)
      }
      return accu;
    }, [])
  }

  toggleTurn() {
    return (this.state.turn === 'X') ? 'O' : 'X';
  }

  componentDidUpdate() {
    if (this.checkWinner(null)) console.log('winner');
    if (this.getOpenTiles().length === 0) console.log('tie');
    if (this.state.AI === this.state.turn) this.handleAITurn();
  }

  render() {
    return (
      <Board
        values={this.state.values}
        onTileClick={this.handleTileClick}/>
    )
  }
}
