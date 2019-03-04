import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import '../styles.scss';
import UploadWidget from './UploadWidget';

export default class PetModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggleModal();
  }
  handleChange(e) {
    this.props.handleChange(e.target.name, e.target.value);
  }
  handleSubmit(e) {
    const { name, animal, description, image } = this.props.pet;
    e.preventDefault();
    if (
      name &&
      name.length > 0 &&
      animal &&
      animal.length > 0 &&
      description &&
      description.length > 0
    ) {
      const pet = {
        name,
        animal,
        description,
        image
      };
      this.props.handler(pet, this.props.petId);
      this.toggle();
    }
  }
  handleImage(url) {
    this.setState({ image: url });
  }
  render() {
    console.log('im a modal and i fired', this.props.modalOpen);
    return (
      <div>
        <Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <ModalHeader toggle={this.toggle}>
              <h3>{this.props.editMode ? 'Edit Pet' : 'Add a Pet'}</h3>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  placeholder="Pet Name"
                  name="name"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Animal"
                  name="animal"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="description"
                  placeholder="Pet Description"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <UploadWidget
                  class="addpicture"
                  handler={url => this.handleImage(url)}
                  imageType="petPic"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <FormGroup>
                <Button className="btn btn-primary" type="submit">
                  <i className="fas fa-save" />
                </Button>
              </FormGroup>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
