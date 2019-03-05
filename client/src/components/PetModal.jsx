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
			image: '',
			name: '',
			animal: '',
			description: ''
		};
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		if (this.props.pet) {
			this.setState({
				image: this.props.pet.image,
				name: this.props.pet.name,
				description: this.props.pet.description,
				animal: this.props.pet.animal
			});
		}
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
		console.log('props in pet modal', this.props.pet);
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
									placeholder={
										this.props.pet.name === undefined
											? 'Pet name'
											: this.props.pet.name
									}
									value={this.state.name}
									name="name"
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									placeholder={
										this.props.pet.animal === undefined
											? 'Animal'
											: this.props.pet.animal
									}
									value={this.state.animal}
									name="animal"
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="textarea"
									bsSize="lg"
									name="description"
									placeholder={
										this.props.pet.description === undefined
											? 'Pet name'
											: this.props.pet.description
									}
									value={this.state.description}
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
