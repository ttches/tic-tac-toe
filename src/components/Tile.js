import React, { Component } from 'react';

export default class Tile extends Component {
  render() {
    return (
      <div className='tile'>{this.props.value}</div>
    )
  }
}
