import React, { Component } from 'react';
import SeasonHeader from './SeasonHeader';
import TowerPointsList from './TowerPointsList';

class SeasonPane extends Component {
  render() {
    return (
      <div>
        <SeasonHeader season={this.props.season} />
        <TowerPointsList
          players={this.props.players}
          season={this.props.season}
          playerSeasons={this.props.playerSeasons}
        />
      </div>
    );
  }
}

export default SeasonPane;