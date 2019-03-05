import React, { Component } from "react";
//import UploadWidget from '../UploadWidget';
import { ApiService } from "../../api/api";
import UpdateUserModal from "../UpdateUserModal";
import Img from "react-image";
import { Button } from "reactstrap";
import "../../styles.scss";
import PetCard from "../PetCard";
import AddPetButton from "../AddPetButton";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.ApiService = new ApiService();
    this.modalToggle = this.modalToggle.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }
  modalToggle() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }
  handleUserUpdate(state) {
    this.ApiService.updateUser(state).then(user => this.props.handler(user));
  }
  handleDelete(id) {
    this.ApiService.deletePet(id).then(res => this.props.handleUpdate(res));
  }
  handleUpdate(id, pet) {
    let petData = {};
    if (pet.name) petData.name = pet.name;
    if (pet.animal) petData.animal = pet.animal;
    if (pet.description) petData.description = pet.description;
    if (pet.image) petData.image = pet.image;
    this.ApiService.updatePet(id, petData).then(res =>
      this.props.handleUpdate(res)
    );
  }
  updatePet(id, pet) {
    this.ApiService.updatePet(id, pet).then(res =>
      this.props.handleUpdate(res)
    );
  }
  addPet(pet) {
    this.ApiService.createPet(pet).then(res => this.props.handleUpdate(res));
  }
  render() {
    return (
      <div>
        <div className="container mt-sm-4 mb-5">
          <div id="test" className="row">
            <div className="col-lg-4 pb-md-1 pl-5 justify-content-md-center profile-container">
              {!this.props.user.image ? (
                <Img
                  className="profile-pic"
                  src="images/camera.png"
                  alt="profile"
                />
              ) : (
                <Img
                  className="profile-pic"
                  src={this.props.user.image}
                  alt="profile"
                />
              )}
              <div className="edit-profile-icon">
                <Button className="btn btn-primary" onClick={this.modalToggle}>
                  <i className="fas fa-pencil-alt" />
                </Button>
                <UpdateUserModal
                  user={this.props.user}
                  modalOpen={this.state.modalOpen}
                  toggleModal={this.modalToggle}
                  handler={state => this.handleUserUpdate(state)}
                  user={this.props.user}
                />
              </div>
            </div>
          </div>
          <div id="test" className="col text-center">
            <h2>Welcome - {this.props.user.name}!</h2>
            <br />
          </div>
          <div id="test" className="col text-center">
            <h3>
              <strong>Bio:</strong> {this.props.user.about}
            </h3>
          </div>

          <div>
            <div className="pet-card-container">
              {this.props.pets !== null ? (
                this.props.pets.map((pet, i) => (
                  <PetCard
                    key={i}
                    pet={pet}
                    handleDelete={id => this.handleDelete(id)}
                    handleUpdate={(id, pet) => this.handleUpdate(id, pet)}
                  />
                ))
              ) : (
                <div />
              )}
            </div>
            <div>
              <AddPetButton handler={pet => this.addPet(pet)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
