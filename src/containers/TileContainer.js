import React, { Component } from 'react';

import Tile from '../components/Tile';

export default class tileContainer extends Component {
  render() {
    return (
      <Tile
        value={this.props.value}
        index={this.props.index}
        onTileClick={this.props.onTileClick}/>
    )
  }
}
