import React, { Component } from 'react';

import BoardContainer from '../containers/BoardContainer';

export default class Game extends Component {
  render() {
    const {AI, AITurn, playing, stopPlaying} = this.props;

    return (
      <BoardContainer
        AI={AI}
        AITurn={AITurn}
        playing={playing}
        stopPlaying={stopPlaying}
      />
    );
  }
}
