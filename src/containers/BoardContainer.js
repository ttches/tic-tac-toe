import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.handleTileClick = this.handleTileClick.bind(this);
    this.state = {
      players: 1,
      turn: 'X',
      values: Array(9).fill(null)
    }
  }

  handleTileClick(e) {
    const index = e.target.dataset.index;
    if (this.state.values[index]) return;
    let newValues = [...this.state.values];
    newValues[index] = this.state.turn
    this.setState({
      ...this.state,
      values: newValues,
      turn: (this.state.turn === 'X') ? 'O' : 'X'
    });
    console.log(index);
  };

  render() {
    return (
      <Board
        values={this.state.values}
        onTileClick={this.handleTileClick}/>
    )
  }
}
