import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import '../styles.scss';

export default class ConfirmModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	toggle() {
		this.props.toggleModal();
	}

	confirmDelete(e) {
		this.props.confirmDelete(e);
	}

	render() {
		if (!this.props.pet) return null;

		return (
			<div>
				<Modal isOpen={this.props.confirmOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>{this.props.pet.name}</ModalHeader>
					<ModalBody>
						<a>Are you sure you want to delete this pet from library?</a>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={e => this.props.confirmDelete(e)}>
              Yes!
						</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>
              No!
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
