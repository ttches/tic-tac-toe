import React, { Component } from 'react';

import TileContainer from '../containers/TileContainer';

export default class Board extends Component {
  render() {

    const { onTileClick } = this.props
    let index = -3;

    function mapRow(arr) {
      index = index + 3;
      return (
        <div className='row'>
          {arr.map((value, i) =>
            <TileContainer
              key={i}
              value={value}
              onTileClick={onTileClick}
              index={i + index}/>)}
        </div>
      )
    }
    return (
      <div className='row-container'>
        {mapRow(this.props.values.slice(0, 3))}
        {mapRow(this.props.values.slice(3, 6))}
        {mapRow(this.props.values.slice(6))}
      </div>
    )
  }
}
