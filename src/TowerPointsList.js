import React, { Component } from 'react';
import PlayerTowerPointsItem from './PlayerTowerPointsItem';

class TowerPointsList extends Component {
  render() {
    let listItems = [];
    if (this.props.players && this.props.playerSeasons) {
      this.props.players.forEach(player => {
        let playerSeason = this.props.playerSeasons.find(playerSeason => playerSeason.playerId === player.id);
        if (playerSeason && playerSeason.seasonId === this.props.season.id) {
          listItems.push(
            <li className='list-group-item' key={player.id}>
              <PlayerTowerPointsItem playerName={player.name} towerPoints={playerSeason.towerPoints} />
            </li>
          );
        }
      });
    }
    if (listItems.length === 0) {
      return null;
    }
    return (
      <div>
        <h3>Tower Points</h3>
        <ul className='list-group'>{listItems}</ul>
      </div>
    );
  }
}

export default TowerPointsList;