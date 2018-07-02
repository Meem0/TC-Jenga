import React, { Component } from 'react';

class AddPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    this.props.addPlayer(this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type='text' value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <input type='submit' value='Add Player' />
      </form>
    );
  }
}

export default AddPlayerForm;