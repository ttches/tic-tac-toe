import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      players: 1,
      values: ['x', 'x', 'x', 'o', 'o', null, null, null, 'o']//new Array(9)
    }
  }
  render() {
    return (
      <Board values={this.state.values} />
    )
  }
}
