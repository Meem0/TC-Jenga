import React, { Component } from 'react';

class PlayerInfo extends Component {
  render() {
    return (
      <div className="PlayerInfo">
        <header className="PlayerInfo-name">
          {this.props.playerName}
        </header>
        <button>Add point</button>
      </div>
    );
  }
}

export default PlayerInfo;
