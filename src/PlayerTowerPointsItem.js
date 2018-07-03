import React, { Component } from 'react';

class PlayerTowerPointsItem extends Component {
    render() {
        return (
            <p className='list-group-item-heading'>
                {this.props.playerName + " - " + this.props.towerPoints}
            </p>
        );
    }
}

export default PlayerTowerPointsItem;