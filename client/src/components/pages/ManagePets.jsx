import React, { Component } from 'react';
import { ApiService } from '../../api/api';
import PetModal from '../PetModal';
import ConfirmModal from '../ConfirmModal';
import { Button } from 'reactstrap';

export default class ManagePets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: null,
      currentPet: null
    };
    this.ApiService = new ApiService();
    this.modalToggle = this.modalToggle.bind(this);
    this.editPet = this.editPet.bind(this);
    this.deletePet = this.deletePet.bind(this);

    this.confirmDelete = this.confirmDelete.bind(this);

    // toggling the confirmation 'popup'
    this.confirmationToggle = this.confirmationToggle.bind(this);
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

  confirmDelete() {
    this.confirmationToggle();
    let idOfDeletedPet = this.state.currentPet._id;
    let stateCopy = this.state.pets;
    for (let i in stateCopy) {
      if (stateCopy[i]._id === idOfDeletedPet) {
        stateCopy.splice(i, 1);
      }
    }
  }

  confirmationToggle() {
    this.setState(prevState => ({
      confirmOpen: !prevState.confirmOpen
    }));
  }

  editPet(pet) {
    console.log('here is a pet', pet);
    this.setState({
      modalPet: pet
    });
    this.modalToggle();
  }

  deletePet(pet) {
    this.confirmationToggle();
    this.setState({
      modalPet: pet,
      currentPet: pet
    });
  }

  render() {
    if (!this.state.pets) return null;

    //console.log('here are my pets', this.state.pets);
    // Display pets

    return (
      <div>
        <Button className="btn btn-success">
          <i className="fas fa-fish" />
        </Button>
        {this.state.pets.map(pet => (
          <div>
            <p>{pet.name}</p>
            <Button
              className="btn btn-success"
              onClick={() => this.editPet(pet)}
            >
              <i className="fas fa-pencil-alt" />
            </Button>
            <Button
              className="btn btn-secondary"
              onClick={() => this.deletePet(pet)}
            >
              <i className="fas fa-minus" />
            </Button>
          </div>
        ))}
        <Button
          className="btn btn-secondary"
          // onClick={() => this.deletePet(pet)}
        >
          <i className="fas fa-plus" />
        </Button>
        <PetModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.modalToggle}
          pet={this.state.modalPet}
        />
        <ConfirmModal
          confirmOpen={this.state.confirmOpen}
          toggleModal={this.confirmationToggle}
          pet={this.state.modalPet}
          confirmDelete={this.confirmDelete}
        />
      </div>
    );
  }
}
