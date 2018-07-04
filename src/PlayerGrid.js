import React, { Component } from 'react';
import PlayerItem from './PlayerItem';

class PlayerGrid extends Component {
  render() {
    let gridItems = [];
    if (this.props.players) {
      this.props.players.forEach(player => {
        gridItems.push(
          <div className='col-sm-4' key={player.id}>
            <PlayerItem player={player} makeMove={this.props.makeMove} />
          </div>
        );
      });
    }
    if (gridItems.length === 0) {
      return null;
    }
    return (
      <div className='container'>
        <div className='row'>
          {gridItems}
        </div>
      </div>
    );
  }
}

export default PlayerGrid;