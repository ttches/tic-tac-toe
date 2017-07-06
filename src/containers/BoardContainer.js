import React, { Component } from 'react';

import Board from '../components/Board';

export default class BoardContainer extends Component {
  constructor(props) {
    super();
    this.checkWinner = this.checkWinner.bind(this);
    this.getOpenTiles = this.getOpenTiles.bind(this);
    this.handleAITurn = this.handleAITurn.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.miniMax = this.miniMax.bind(this);
    this.playTile = this.playTile.bind(this);
    this.toggleTurn = this.toggleTurn.bind(this);
    this.state = {
      //Current player turn
      turn: 'X',
      //All board tile values, 'X', 'O', or null
      values: Array(9).fill(null)
    }
  }

  //handles the users move
  handleTileClick(e) {
    //If it's the computer's turn, return
    if (this.props.AITurn === this.state.turn || this.props.playing === false) return;
    const index = e.target.dataset.index;
    //If the tile is occupied, return
    if (this.state.values[index] ) return;
    this.playTile(index);
  };

  handleAITurn() {
    const delay = (Math.floor(Math.random() * 2) + 0.5) * 1000;
    const { AI } = this.props
    //chooses master, basic, or intermediate AI
    const fn = (AI === 'master')
      ? this.masterAI.bind(this)
      : (AI === 'basic')
        ? this.basicAI.bind(this)
        : console.log
    setTimeout(() => fn(), delay);
  }

  basicAI() {
    //plays random tile
    const openTiles = this.getOpenTiles();
    const randomTile = openTiles[Math.floor(Math.random() * openTiles.length)];
    this.playTile(randomTile)
  }

  masterAI() {
    const openTiles = this.getOpenTiles();
    //minimax possible moves
    const tileScores =
      openTiles.map((tile) => {
        let newValues = [...this.state.values];
        newValues[tile] = this.state.turn;
        return this.miniMax(newValues, this.state.turn, this.state.turn);
      });
    //choses a random best move if more than one exist
    const bestTileScore = tileScores.reduce((accu, score) => (score > accu) ? score : accu, -11);
    const bestTileScores = tileScores.reduce((accu, score, i) => {
      if (score === bestTileScore) accu.push(i);
      return accu;
    }, []);
    const choiceIndex = bestTileScores[Math.floor(Math.random() * bestTileScores.length)];
    this.playTile(openTiles[choiceIndex]);
  }

  miniMax(values, turnState, AIturn) {
    const openTiles = this.getOpenTiles(values);
    const winner = this.checkWinner(values);
    let scores = [];
    turnState = this.toggleTurn(turnState);
    //return 10 if AI wins, 0 for tie, -10 for loss
    if (winner) {
      return (winner === AIturn)
      ? 10 : (winner === 'tie')
        ? 0 : -10
    }
    //create all possible boards
    for (let i = 0; i < openTiles.length; i++) {
      let newValues = [...values];
      newValues[openTiles[i]] = turnState;
      scores.push(this.miniMax(newValues, turnState, AIturn));
    }
    //choose min or max depending on who's turn it is
    if (turnState === AIturn) {
      return scores.reduce((accu, score) => (score > accu) ? score : accu, -11)
    } else {
      return scores.reduce((accu, score) => (score < accu) ? score : accu, 11)
    }
  }

  playTile(tile) {
    let newValues = [...this.state.values];
    newValues[tile] = this.state.turn
    this.setState({
      ...this.state,
      values: newValues,
      turn: this.toggleTurn(this.state.turn)
    });
  }

  checkWinner(i = this.state.values) {
    let winner;
    if (i.slice(0, 3).every((value) => value === i[0] && i[0] !== null)) winner = i[0]
    if (i.slice(3, 6).every((value) => value === i[3] && i[3] !== null)) winner = i[3]
    if (i.slice(6, 9).every((value) => value === i[6] && i[6] !== null)) winner = i[6]
    if ([i[0], i[3], i[6]].every((value) => value === i[0] && i[0] !== null)) winner = i[0]
    if ([i[1], i[4], i[7]].every((value) => value === i[1] && i[1] !== null)) winner = i[1]
    if ([i[2], i[5], i[8]].every((value) => value === i[2] && i[2] !== null)) winner = i[2]
    if ([i[0], i[4], i[8]].every((value) => value === i[0] && i[0] !== null)) winner = i[0]
    if ([i[2], i[4], i[6]].every((value) => value === i[2] && i[2] !== null)) winner = i[2]
    if (winner) return winner;
    if (this.getOpenTiles(i).length === 0) return 'tie'
    return false;
  }

  getOpenTiles(tiles = this.state.values) {
    return tiles.reduce((accu, value, i) => {
      if (value === null) {
        accu.push(i)
      }
      return accu;
    }, [])
  }

  toggleTurn(turn) {
    return (turn === 'X') ? 'O' : 'X';
  }

//LifeCycles
  componentDidUpdate() {
    const winner = this.checkWinner();
    if ((winner) && this.props.playing === true) {
      console.log(winner);
      this.props.stopPlaying();
    }

    else if (this.props.AITurn === this.state.turn && this.props.playing === true) {
      this.handleAITurn();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.restart > this.props.restart) {
      this.setState({
        turn: 'X',
        values: Array(9).fill(null)
      })
    }
  }

  render() {
    return (
      <Board
        values={this.state.values}
        onTileClick={this.handleTileClick}/>
    )
  }
}
