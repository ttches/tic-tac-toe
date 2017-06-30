import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.checkWinner = this.checkWinner.bind(this);
    this.getOpenTiles = this.getOpenTiles.bind(this);
    this.handleAITurn = this.handleAITurn.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.masterAI = this.masterAI.bind(this);
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
    const openTiles = this.getOpenTiles(); //array of open game spaces
    const randomTile = openTiles[Math.floor(Math.random() * openTiles.length)]; //comment out once masterAI works
    /*testing this with a console.log
    I want an array of openTiles.length with a value of how strong
    a move at each tile would be*/
    console.log(openTiles, openTiles.map((tile) => {
      let values = [...this.state.values];
      values[tile] = this.state.turn;
      return this.masterAI(values, this.state.turn, 0, this.state.turn);
    }))
    setTimeout(() => this.playTile(randomTile), delay) //comment out once masterAI works
  }

  masterAI(values, turn, score, AISymbol) {
    //base cases
    console.log('Board at beginning of recursion: ', values);
    if (this.checkWinner(values) === AISymbol) return score + 10;
    if (this.checkWinner(values) === this.toggleTurn(AISymbol)) return score - 10;
    if (this.getOpenTiles(values).length === 0) return score;
    var openTiles = this.getOpenTiles(values);
    console.log('Open tiles: ', openTiles);
    openTiles.forEach((tile) => {
      values[tile] = turn;
      turn = this.toggleTurn(turn);
      console.log('Board at end of recursion: ', values);
      return score + this.masterAI(values, turn, score, AISymbol);
    })
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
    }
    if (this.state.AI === this.state.turn) {
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
