import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import '../styles.scss';

export default class PetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggleModal();
  }

  render() {
    if (!this.props.pet) return null;
    console.log('now rendering a pet', this.props.pet);

    return (
      <div>
        <Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.pet.name}</ModalHeader>
          <ModalBody>
            <Form>
              <Input placeholder={this.props.pet.name} bsSize="lg" />
              <br />
              <Input placeholder="Animal" />
              <br />
              <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" />
              </FormGroup>
              TODO: add form here
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
