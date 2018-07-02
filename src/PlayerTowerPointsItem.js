import React, { Component } from 'react';

class PlayerTowerPointsItem extends Component {
    render() {
        return (
            <div>
                <p>
                    {this.props.playerName + " - " + this.props.towerPoints}
                </p>
            </div>
        );
    }
}

export default PlayerTowerPointsItem;