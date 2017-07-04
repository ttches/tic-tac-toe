import React, { Component } from 'react';

import BoardContainer from '../containers/BoardContainer';

export default class Game extends Component {
  render() {
    const {AI, AITurn, playing, stopPlaying} = this.props;

    return (
      <div className='game-container'>
        <BoardContainer
          AI={AI}
          AITurn={AITurn}
          playing={playing}
          stopPlaying={stopPlaying}
        />
        <div className='options-container'>
          <div className='start'>
            <span className='start-btn'>
              <h1>
                {(playing) ? 'Start Playing' : 'Start Over'}
              </h1>
            </span>
          </div>

          <div className='player-container'>
            <h1>Players</h1>
          </div>

          <div className='AI-options'>
            <h1>AI Options</h1>
          </div>
        </div>
      </div>
    );
  }
}
