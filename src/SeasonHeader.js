import React, { Component } from 'react';

class SeasonHeader extends Component {
    render() {
        if (!this.props.season) {
            return null;
        }
        return (
            <div>
                <h1>{'Season ' + this.props.season.number}</h1>
                <h4>
                {
                    this.makeDateString(this.props.season.startTime)
                    + ' - '
                    + this.makeDateString(this.props.season.endTime)
                }
                </h4>
            </div>
        );
    }

    makeDateString(date) {
        return date.toLocaleString('en-US', {month: 'long', day: 'numeric'});
    }
}

export default SeasonHeader;