import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.handleTileClick = this.handleTileClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.state = {
      players: 1,
      turn: 'X',
      values: Array(9).fill(null)
    }
  }

  handleTileClick(e) {
    const index = e.target.dataset.index;
    if (this.state.values[index] ) return;
    let newValues = [...this.state.values];
    newValues[index] = this.state.turn
    this.setState({
      ...this.state,
      values: newValues,
      turn: (this.state.turn === 'X') ? 'O' : 'X'
    });
  };

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
  componentDidUpdate() {
    const i = this.state.values;
    if (this.checkWinner(null)) console.log('winner');
  }

  render() {
    return (
      <Board
        values={this.state.values}
        onTileClick={this.handleTileClick}/>
    )
  }
}
