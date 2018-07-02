import React, { Component } from 'react';

class PlayerItem extends Component {
  render() {
    if (!this.props.player) {
      return null;
    }
    return (
      <span>
        {this.props.player.name}
        <button onClick={() => this.props.makeMove(this.props.player.id)}>
          Move
        </button>
      </span>
    );
  }
}

export default PlayerItem;