import React, { Component } from 'react';
import { ApiService } from '../api/api';
import PetModal from './PetModal';
import { Button } from 'reactstrap';

export default class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {
        image: null,
        name: null,
        animal: null,
        description: null
      },
      pets: []
    };
    this.ApiService = new ApiService();
    this.createModalToggle = this.createModalToggle.bind(this);
    this.handleModalFormChange = this.handleModalFormChange.bind(this);
  }

  componentDidMount() {
    this.getPets();
  }

  createModalToggle() {
    this.setState(prevState => ({
      createModalOpen: !prevState.createModalOpen
    }));
  }
  editModalToggle(pet) {
    this.setState(prevState => ({
      pet,
      editModalOpen: !prevState.editModalOpen
    }));
    console.log('my pet is now', this.state, pet);
  }

  addPet(pet) {
    this.ApiService.createPet(pet);
  }
  updatePet(pet, id) {
    this.ApiService.updatePet(id, pet);
  }

  handleModalFormChange(key, value) {
    this.setState({
      pet: { ...this.state.pet, [key]: value },
      editModalOpen: true
    });
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
              <div className="left-pet-box">
                {pet.name}
                <br/>
                {pet.animal}
                <br/>
                {pet.description}
                <br />
              </div>
              <div className="right-pet-box">
                {pet.image ? <img src={pet.image}></img> : <i class="fas fa-paw fa-5x no-pet-image"></i>}
              </div>
              <Button onClick={() => this.editModalToggle(pet)}>
                <i className="fas fa-edit" />
              </Button>
            </div>
          ))}
        <div className="pet-box">
          <Button
            className="btn btn-primary add-pet-button"
            onClick={this.createModalToggle}
          >
            <i className="fas fa-plus fa-5x" />
          </Button>
        </div>
        <div className="clearfix" />

        <PetModal
          modalOpen={this.state.createModalOpen}
          toggleModal={this.createModalToggle}
          handler={pet => this.addPet(pet)}
          editMode={false}
          handleChange={this.handleModalFormChange}
        />
        <PetModal
          modalOpen={this.state.editModalOpen}
          toggleModal={this.editModalToggle}
          handler={pet => this.updatePet(pet.id, pet)}
          pet={this.state.pet}
          editMode={true}
          handleChange={this.handleModalFormChange}
        />
      </div>
    );
  }
}
