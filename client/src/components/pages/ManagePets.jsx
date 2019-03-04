import React, { Component } from 'react';
import { ApiService } from '../../api/api';

export default class ManagePets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: null
    };
    this.ApiService = new ApiService();
  }
  componentDidMount() {
    this.ApiService.getPets(this.props.user).then(res => {
      console.log('got some pets', res);
      this.setState({
        pets: res.data
      });
    });
  }

  render() {
    if (!this.state.pets) return null;

    console.log('here are my pets', this.state.pets);
    // Display pets

    return (
      <div>
        {this.state.pets.map(pet => (
          <div>{pet.name}</div>
        ))}
      </div>
    );
  }
}
