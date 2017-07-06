import React, { Component } from 'react';

import BoardContainer from '../containers/BoardContainer';

export default class Game extends Component {
  render() {
    const {AI, AITurn, players, playing, restart, stopPlaying,
      onPlayersChange} = this.props;

    return (
      <div className='game-container'>
        <BoardContainer
          AI={AI}
          AITurn={AITurn}
          playing={playing}
          restart={restart}
          stopPlaying={stopPlaying}
        />
        <div className='options-container'>
          <div className='start'>
            <span className='start-btn' onClick={this.props.onRestartGame}>
              <h1 className='pink-neon'>
                {(restart) ? 'Start Over' : 'Start Playing'}
              </h1>
            </span>
          </div>

          <div className='player-container'>
            <h1 className='pink-neon'>Players</h1>
            <input type='radio' name='players' value='1'
              onChange={onPlayersChange}
              checked={players === '1'}/>1
            <input type='radio' name='players' value='2'
              onChange={onPlayersChange}
              checked={players === '2'}/>2
          </div>

          <div className='AI-options'>
            <h1 className={(players === '1') ? 'pink-neon' : ''}>AI Options</h1>
            <input type='radio' name='AI' value='easy'/>Easy
            <input type='radio' name='AI' value='medium'/>Medium
            <input type='radio' name='AI' value='master' defaultChecked/>Master
          </div>
        </div>
      </div>
    );
  }
}
