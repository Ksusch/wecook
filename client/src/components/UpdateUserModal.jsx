import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap';

import '../styles.scss';
import UploadWidget from './UploadWidget';

export default class UpdateUserModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			name: '',
			about: ''
		};
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		console.log('in cmdm', this.props.user);
		let userData = {
			name: this.props.user.name ? this.props.user.name : '',
			about: this.props.user.about ? this.props.user.about : '',
			image: this.props.user.image ? this.props.user.image : ''
		};
		this.setState({
			userData
		});
	}
	toggle() {
		this.props.toggleModal();
	}
	handleChange(e) {
		console.log('in handleChange', e.target);
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (
			this.state.name &&
      this.state.name.length > 0 &&
      this.state.about &&
      this.state.about.length > 0 &&
      (this.props.user.name !== this.state.name ||
        this.props.user.about !== this.state.about ||
        this.props.user.image !== this.state.image)
		) {
			let userData = {};
			if (this.state.name) userData.name = this.state.name;
			if (this.state.about) userData.about = this.state.about;
			if (this.state.image) userData.image = this.state.image;
			this.props.handler(userData);
			this.toggle();
		} else {
			this.toggle();
		}
	}
	handleImage(url) {
		console.log('hello from updaterender');
		this.setState({ image: url });
	}
	render() {
		return (
			<div>
				<Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>About me!</ModalHeader>
					<ModalBody>
						<UploadWidget
							handler={url => this.handleImage(url)}
							imageType="petPic"
						/>
						<Form onSubmit={e => this.handleSubmit(e)}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									value={this.state.name}
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="about">About</Label>
								<Input
									type="textarea"
									name="about"
									id="about"
									value={this.state.about}
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Button type="submit">Update My Info!</Button>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter />
				</Modal>
			</div>
		);
	}
}
