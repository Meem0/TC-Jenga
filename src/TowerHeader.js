import React, { Component } from 'react';

class TowerHeader extends Component {
  constructor(props) {
    super(props);

    this.handleTopple = this.handleTopple.bind(this);
  }

  handleTopple(event) {
    this.props.toppleTower();
  }

  render() {
    let lastMovePlayerName = '';
    if (this.props.lastMovePlayer) {
      lastMovePlayerName = this.props.lastMovePlayer.name;
    }
    let towerTitle = '';
    if (this.props.currentGame) {
      towerTitle = 'Tower ' + this.props.currentGame.number;
    }
    return (
      <div>
        <span>
          {towerTitle}
          <button type='button' className='btn btn-danger' onClick={this.handleTopple}>
            Topple!
          </button>
          <p>Last move: {lastMovePlayerName}</p>
        </span>
      </div>
    );
  }
}

export default TowerHeader;
