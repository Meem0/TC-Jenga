import React, { Component } from 'react';
import PlayerItem from './PlayerItem';

class PlayerGrid extends Component {
  render() {
    let gridItems = [];
    if (this.props.players) {
      this.props.players.forEach(player => {
        gridItems.push(
          <li key={player.id}>
            <PlayerItem player={player} makeMove={this.props.makeMove} />
          </li>
        );
      });
    }
    if (gridItems.length === 0) {
      return null;
    }
    return (
      <div>
        <ul>{gridItems}</ul>
      </div>
    );
  }
}

export default PlayerGrid;