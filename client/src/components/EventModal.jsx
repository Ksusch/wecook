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
import UploadWidget from './UploadWidget';
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
	accessToken: 'pk.eyJ1IjoibWMxMDBzIiwiYSI6ImNqb2E2ZTF3ODBxa3czd2xldHp1Z2FxbGYifQ.U4oatm5RsTXXHQLz5w66dQ'
});

export default class EventModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			name: '',
			description: '',
			location: '',
			image: '',
			searchResults: []
		};
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		if (this.props.event !== undefined) {
			this.setState({
				image: this.props.event.image,
				name: this.props.event.name,
				description: this.props.event.description,
				location: this.props.event.location
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
		if (e.target.name === 'location') {
			geocodingClient
				.forwardGeocode({
					query: e.target.value
				})
				.send()
				.then(response => {
					this.setState({
						searchResults: response.body.features
					});
				});
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		if (
			this.state.name &&
      this.state.name.length > 0 &&
      this.state.location.address &&
      this.state.location.address.length > 0 &&
      this.state.location.coordinates &&
      this.state.location.coordinates.length > 0 &&
      this.state.description &&
      this.state.description.length > 0
		) {
			let event = {
				name: this.state.name,
				location: this.state.location,
				description: this.state.description,
				image: this.state.image
			};
			this.props.handler(event);
			this.toggle();
		}
	}
	handleImage(url) {
		this.setState({ image: url });
	}
	handleSearchResultClick(result) {
		this.setState({
			location: {
				address: result.place_name,
				coordinates: result.center
			},
			searchResults: []
		});
	}
	render() {
		if (!this.props.event) return <div>Loading</div>;
		else return (
			<div>
				<Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
					<Form onSubmit={e => this.handleSubmit(e)}>
						<ModalHeader toggle={this.toggle}><span className="modal-header">Add an Event</span></ModalHeader>
						<ModalBody>
							<UploadWidget
								handler={url => this.handleImage(url)}
								imageType="eventPic"
							/>
							<div className="modal-camera-padding" />
						
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
									placeholder='Location'
									value={this.state.location && this.state.location.address}
									name="location"
									onChange={e => this.handleChange(e)}
								/>
								{this.state.searchResults.map(result => (
									<div onClick={() => this.handleSearchResultClick(result)}>
										{result.place_name}
										<hr />
									</div>
								))}
							</FormGroup>
							<FormGroup>
								<Input
									type="textarea"
									name="description"
									placeholder={
										this.props.event.description === undefined
											? 'Description'
											: this.props.event.description
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
