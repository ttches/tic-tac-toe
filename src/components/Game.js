import React, { Component } from 'react';

import BoardContainer from '../containers/BoardContainer';

export default class Game extends Component {
  render() {
    const {AI, AITurn, players, playing, restart, stopPlaying,
      onPlayersChange, onAIChange, onToggleAITurn} = this.props;

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
              <h1 className='start-neon'>
                Start Over
              </h1>
            </span>
          </div>

          <div className='player-container'>
            <h1 className='pink-neon'>Players</h1>
            <span
              className={`player-number ${(players === '1') ? 'pink-neon' : ''}`}
              data-value='1'
              onClick={onPlayersChange}>
              1
            </span>
            <span
              className={`player-number ${(players === '2') ? 'pink-neon' : ''}`}
              data-value='2'
              onClick={onPlayersChange}>
              2
            </span>
          </div>

          <div className='AI-options'>
            <h1 className={(players === '1') ? 'pink-neon' : ''}>AI Options</h1>

            <span
              className={`AI-difficulty ${(players === '2') ? ''
              : (AI === 'easy') ? 'pink-neon' : ''}`}
              data-value='easy'
              onClick={onAIChange}>
              Easy
            </span>

            <span
              className={`AI-difficulty ${(players === '2') ? ''
              : (AI === 'medium') ? 'pink-neon' : ''}`}
              data-value='medium'
              onClick={onAIChange}>
              Medium
            </span>

            <span
              className={`AI-difficulty ${(players === '2') ? ''
              : (AI === 'master') ? 'pink-neon' : ''}`}
              data-value='master'
              onClick={onAIChange}>
              Master
            </span>

            <div
              className={`AI-first ${(AITurn === 'X') ? 'pink-neon' : ''}`}
              onClick={onToggleAITurn}>
              AI Plays First
            </div>
          </div>
        </div>
      </div>
    );
  }
}
