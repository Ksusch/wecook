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
} from 'reactstrap';
import '../styles.scss';
import UploadWidget from './UploadWidget';

export default class EventModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			name: '',
			description: '',
			location: '',
			image: '',
		};
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		if (this.props.event) {
			this.setState({
				image: this.props.event.image,
				name: this.props.event.name,
				description: this.props.event.description,
				location: this.props.event.location,
			});
		}
	}
	toggle() {
		this.props.toggleModal();
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (
			this.state.name &&
			this.state.name.length > 0 &&
			this.state.location &&
			this.state.location.length > 0 &&
			this.state.description &&
			this.state.description.length > 0
		) {
			let event = {
				name: this.state.name,
				location: this.state.location,
				description: this.state.description,
				image: this.state.image,
			};
			this.props.handler(event);
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
					<ModalHeader toggle={this.toggle}>Add an Event</ModalHeader>
					<ModalBody>
						<UploadWidget
							handler={url => this.handleImage(url)}
							imageType="eventPic"
						/>
						<Form onSubmit={e => this.handleSubmit(e)}>
							<FormGroup>
								<Input
									placeholder={
										this.props.event.name === undefined
											? 'Event name'
											: this.props.event.name
									}
									value={this.state.name}
									name="name"
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									placeholder={
										this.props.event.location === undefined
											? 'Location'
											: this.props.event.location
									}
									value={this.state.location}
									name="location"
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="textarea"
									name="description"
									placeholder={
										this.props.event.description ===
										undefined
											? 'Event name'
											: this.props.event.description
									}
									value={this.state.description}
									onChange={e => this.handleChange(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									className="btn btn-primary"
									type="submit"
								>
									<i className="fas fa-save" />
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
