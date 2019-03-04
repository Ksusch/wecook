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
    this.state = {
      modal: false,
      image: null,
      name: null,
      animal: null,
      description: null
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggleModal();
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.name &&
      this.state.name.length > 0 &&
      this.state.animal &&
      this.state.animal.length > 0 &&
      this.state.description &&
      this.state.description.length > 0
    ) {
      let pet = {
        name: this.state.name,
        animal: this.state.animal,
        description: this.state.description,
        image: this.state.image
      };
      this.props.handler(pet);
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
              <h3>Add a Pet</h3>
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
