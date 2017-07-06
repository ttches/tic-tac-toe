import React, { Component } from 'react';

import BoardContainer from '../containers/BoardContainer';

export default class Game extends Component {
  render() {
    const {AI, AITurn, players, playing, restart, stopPlaying,
      onPlayersChange, onAIChange} = this.props;

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
                Start Over
              </h1>
            </span>
          </div>

          <div className='player-container'>
            <h1 className='pink-neon'>Players</h1>
            <input type='radio' name='players' value='1'
              onChange={onPlayersChange}
              checked={players === '1'}/>
              <span className={(players === '1') ? 'pink-neon' : ''}>1</span>
            <input type='radio' name='players' value='2'
              onChange={onPlayersChange}
              checked={players === '2'}/>
              <span className={(players === '2') ? 'pink-neon' : ''}>2</span>
          </div>

          <div className='AI-options'>
            <h1 className={(players === '1') ? 'pink-neon' : ''}>AI Options</h1>
            <input type='radio' name='AI' value='easy' checked={AI === 'easy'}
              onChange={onAIChange} />
              <span
                className={(players === '2') ? ''
                : (AI === 'easy') ? 'pink-neon' : ''}>Easy</span>
            <input type='radio' name='AI' value='medium' checked={AI === 'medium'}
              onChange={onAIChange} />
              <span
                className={(players === '2') ? ''
                : (AI === 'medium') ? 'pink-neon' : ''}>Medium</span>
            <input type='radio' name='AI' value='master' checked={AI === 'master'}
              onChange={onAIChange} />
              <span
                className={(players === '2') ? ''
                : (AI === 'master') ? 'pink-neon' : ''}>Master</span>
          </div>
        </div>
      </div>
    );
  }
}
