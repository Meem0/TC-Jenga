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
      <div>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input className='form-control' type='text' id='name' value={this.state.name} onChange={this.handleNameChange} />
          </div>
          <input className='btn btn-default' type='submit' value='Add Player' />
        </form>
      </div>
    );
  }
}

export default AddPlayerForm;