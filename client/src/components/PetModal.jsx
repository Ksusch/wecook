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
      this.state.description.length > 0 &&
      (this.state.name !== this.props.pet.name ||
        this.state.description !== this.props.pet.description ||
        this.state.animal !== this.props.pet.animal ||
        this.state.image !== this.props.pet.image)
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
					<Form onSubmit={e => this.handleSubmit(e)}>
						<ModalHeader toggle={this.toggle}><span className="modal-header">Add a Pet</span></ModalHeader>
						<ModalBody>
							<UploadWidget
								handler={url => this.handleImage(url)}
								imageType="petPic"
							/>
							<div className="modal-camera-padding" />
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
									name="description"
									placeholder={
										this.props.pet.description === undefined
											? 'Description'
											: this.props.pet.description
									}
									value={this.state.description}
									onChange={e => this.handleChange(e)}
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
