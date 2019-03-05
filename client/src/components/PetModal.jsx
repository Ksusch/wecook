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
		return (
			<div>
				<Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add a Pet</ModalHeader>
					<ModalBody>
						<UploadWidget
							handler={url => this.handleImage(url)}
							imageType="petPic"
						/>
						<Form onSubmit={e => this.handleSubmit(e)}>
							<FormGroup>
								<Input
									placeholder={this.props.pet.name || 'Pet name'}
									value={this.props.pet.name || ''}
									name="name"
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									placeholder={this.props.pet.animal || 'Animal'}
									value={this.props.pet.animal || ''}
									name="animal"
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="textarea"
									bsSize="lg"
									name="description"
									placeholder={this.props.pet.description || 'Pet name'}
									value={this.props.pet.description || ''}
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Button className="btn btn-primary" type="submit">
									<i className="fas fa-plus" />
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter />
				</Modal>
			</div>
		);
	}
}
