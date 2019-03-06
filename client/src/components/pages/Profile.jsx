import React, { Component } from 'react';
import { ApiService } from '../../api/api';
import UpdateUserModal from '../UpdateUserModal';
import Img from 'react-image';
import { Button } from 'reactstrap';
import '../../styles.scss';
import PetCard from '../PetCard';
import EventCard from '../EventCard';
import AddPetButton from '../AddPetButton';
import AddEventButton from '../AddEventButton';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
		this.ApiService = new ApiService();
		this.modalToggle = this.modalToggle.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}
	modalToggle() {
		this.setState(prevState => ({
			modalOpen: !prevState.modalOpen
		}));
	}
	updateUser(state) {
		this.ApiService.updateUser(state).then(user => this.props.handler(user));
	}
	updatePet(id, pet) {
		let petData = {};
		if (pet.name) petData.name = pet.name;
		if (pet.animal) petData.animal = pet.animal;
		if (pet.description) petData.description = pet.description;
		if (pet.image) petData.image = pet.image;
		this.ApiService.updatePet(id, petData).then(res =>
			this.props.handleUpdate(res)
		);
	}
	createPet(pet) {
		this.ApiService.createPet(pet).then(res => this.props.handleUpdate(res));
	}
	deletePet(id) {
		this.ApiService.deletePet(id).then(res => this.props.handleUpdate(res));
	}
	updateEvent(id, event) {
		let eventData = {};
		if (event.name) eventData.name = event.name;
		if (event.animal) eventData.animal = event.animal;
		if (event.description) eventData.description = event.description;
		if (event.image) eventData.image = event.image;
		this.ApiService.updateEvent(id, event).then(res =>
			this.props.handleUpdate(res)
		);
	}
	createEvent(event) {
		this.ApiService.createEvent(event).then(res =>
			this.props.handleUpdate(res)
		);
	}
	deleteEvent(id) {
		this.ApiService.deleteEvent(id).then(res => this.props.handleUpdate(res));
	}
	render() {
		console.log(this.props.events);
		return (
			<div className="container mt-sm-4 mb-5">
				<div id="test" className="row">
					<div className="col-lg-4 pb-md-1 pl-5 justify-content-md-center d-flex justify-content-center profile-container">
						{!this.props.user.image ? (
							<Img
								className="profile-pic"
								src="images/camera.png"
								alt="profile"
							/>
						) : (
							<Img
								className="profile-pic"
								src={this.props.user.image}
								alt="profile"
							/>
						)}
						<div className="edit-profile-icon">
							<Button className="btn btn-primary" onClick={this.modalToggle}>
								<i className="fas fa-pencil-alt" />
							</Button>
							<UpdateUserModal
								user={this.props.user}
								modalOpen={this.state.modalOpen}
								toggleModal={this.modalToggle}
								handler={state => this.updateUser(state)}
								user={this.props.user}
							/>
						</div>
					</div>
				</div>
				<div id="test" className="col text-center">
					<h2>Welcome - {this.props.user.name}!</h2>
					<br />
				</div>
				<div id="test" className="col text-center">
					<h3>
						<strong>About:</strong> {this.props.user.about}
					</h3>
				</div>
				<hr className="bighr" />

				<div>
					<h2>Your pets</h2>
					<div className="card-container">
						{this.props.pets !== null ? (
							this.props.pets.map((pet, i) => (
								<PetCard
									key={i}
									pet={pet}
									deletePet={id => this.deletePet(id)}
									updatePet={(id, pet) => this.updatePet(id, pet)}
								/>
							))
						) : (
							<div />
						)}
					</div>
					<hr className="bighr" />
					<div>
						<h3>Add a pet</h3>
						<AddPetButton handler={pet => this.createPet(pet)} />
					</div>
				</div>
				<div>
					<br />
					<h2>Your events</h2>
					<div className="card-container">
						{this.props.events ? (
							this.props.events.map((event, i) => (
								<EventCard
									key={i}
									event={event}
									deleteEvent={id => this.deleteEvent(id)}
									updateEvent={(id, event) => this.updateEvent(id, event)}
								/>
							))
						) : (
							<div />
						)}
					</div>
					<div>
						<h3>Add an event</h3>
						<AddEventButton handler={event => this.createEvent(event)} />
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
