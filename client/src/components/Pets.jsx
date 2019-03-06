import React, { Component } from 'react';
import { ApiService } from '../api/api';
import PetModal from './PetModal';
import { Button } from 'reactstrap';

export default class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: null,
      animal: null,
      description: null,
      pets: []
    };
    this.ApiService = new ApiService();
    this.modalToggle = this.modalToggle.bind(this);
  }

  componentDidMount() {
    this.getPets();
  }

  modalToggle() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }

  addPet(pet) {
    this.ApiService.createPet(pet);
  }

  getPets() {
    this.ApiService.getPets(this.props.user).then(res => {
      this.setState({
        pets: res.data
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.pets &&
          this.state.pets.map(pet => (
            <div className="pet-box">
              {pet.name}
              <br />
              <Button>
                <i className="fas fa-pen" />
              </Button>
            </div>
          ))}
        <div className="pet-box">
          <Button
            className="btn btn-primary"
            onClick={this.modalToggle}
          >
            <i className="fas fa-plus fa-5x" />
          </Button>
        </div>
        <div className="clearfix" />

        <PetModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.modalToggle}
          handler={pet => this.addPet(pet)}
        />
      </div>
    );
  }
}
