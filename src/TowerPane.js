import React, { Component } from 'react';
import TowerHeader from './TowerHeader';
import PlayerGrid from './PlayerGrid';
import AddPlayerForm from './AddPlayerForm';

class TowerPane extends Component {
  render() {
    return (
      <div>
        <TowerHeader
          toppleTower={this.props.toppleTower}
          currentGame={this.props.currentGame}
          lastMovePlayer={this.props.lastMovePlayer}
        />
        <PlayerGrid
          makeMove={this.props.makeMove}
          players={this.props.players}
        />
        <AddPlayerForm
          addPlayer={this.props.addPlayer}
        />
      </div>
    );
  }
}

export default TowerPane;
