import React, { Component } from 'react';

class PlayerItem extends Component {
  render() {
    if (!this.props.player) {
      return null;
    }
    return (
      <div>
        <span className='label label-default'>{this.props.player.name}</span>
        <button
          type='button' className='btn btn-primary btn-sm'
          onClick={() => this.props.makeMove(this.props.player.id)}>
          Move
        </button>
      </div>
    );
  }
}

export default PlayerItem;
