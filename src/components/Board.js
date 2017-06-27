import React, { Component } from 'react';

import TileContainer from '../containers/TileContainer';

export default class Board extends Component {
  render() {
    return (
      <div>
        {this.props.values.map((value, i) =>
           <TileContainer key={i} value={value}/>)}
      </div>
    )
  }
}
