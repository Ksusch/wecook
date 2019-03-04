import React, { Component } from 'react';
import { ApiService } from '../../api/api';
import PetModal from '../PetModal';
import { Button } from 'reactstrap';

export default class ManagePets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: null
    };
    this.ApiService = new ApiService();
    this.modalToggle = this.modalToggle.bind(this);
    this.editPet = this.editPet.bind(this);
  }

  componentDidMount() {
    this.getPets();
  }

  getPets() {
    console.log('getting pets again');
    this.ApiService.getPets(this.props.user).then(res => {
      console.log('got some pets', res);
      this.setState({
        pets: res.data
      });
    });
  }

  handleUpdate(petId) {
    this.ApiService.updatePet(petId, this.props.user).then(res => {
      // Pet updated
    });
  }

  modalToggle() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }

  editPet(pet) {
    console.log('here is a pet', pet);
    this.setState({
      modalPet: pet
    });
    this.modalToggle();
  }

  render() {
    if (!this.state.pets) return null;

    console.log('here are my pets', this.state.pets);
    // Display pets

    return (
      <div>
        {this.state.pets.map(pet => (
          <div>
            <p>{pet.name}</p>
            <Button color="danger" onClick={() => this.editPet(pet)}>
              Edit
            </Button>
          </div>
        ))}
        <PetModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.modalToggle}
          pet={this.state.modalPet}
        />
      </div>
    );
  }
}
