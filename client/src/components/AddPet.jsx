import React, { Component } from 'react';
import { ApiService } from '../api/api';
import AddPetModal from './AddPetModal';
import { Button } from 'reactstrap';

export default class AddPetButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: null,
      animal: null,
      description: null
    };
    this.ApiService = new ApiService();
    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }
  addPet(pet) {
    this.ApiService.createPet(pet);
  }

  render() {
    return (
      <div>
        <Button
          className="btn btn-primary add-pet-button"
          onClick={this.modalToggle}
        >
          <AddPetModal
            modalOpen={this.state.modalOpen}
            toggleModal={this.modalToggle}
            handler={pet => this.addPet(pet)}
          />
          <i className="fas fa-plus fa-5x" />
        </Button>
      </div>
    );
  }
}
