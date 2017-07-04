import React, { Component } from 'react';

export default class Tile extends Component {
  render() {
    return (
      <span
        className={`tile ${this.props.value}-neon`}
        data-index={this.props.index}
        onClick={this.props.onTileClick}>
          {this.props.value || ''}
      </span>
    )
  }
}
