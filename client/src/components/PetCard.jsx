import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PetModal from './PetModal';
// Pass IDX for unique id
//TODO: Restyle the component and make it into a generic component ready to receive content from an external component through props.
export default class PetCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.modalToggle = this.modalToggle.bind(this);
	}
	modalToggle() {
		this.setState(prevState => ({
			modalOpen: !prevState.modalOpen
		}));
	}
	deletePet() {
		this.props.deletePet(this.props.pet._id);
	}
	updatePet(pet) {
		this.props.updatePet(this.props.pet._id, pet);
	}
	render() {
		return (
			<div className="flex-test event-card">
				<div className="event-card-top d-flex justify-content-between">
					<h3> {this.props.pet.name || ''}</h3>
				</div>
				<div>
					<div className="event-image-wrapper d-flex">
						{this.props.pet.image === undefined ? (
							<i className="fas fa-camera fa-5x" />
						) : (
							<img
								src={this.props.pet.image}
								// className="profile-pic"
								alt="this pet"
							/>
						)}
					</div>
				</div>
				<div className="event-card-location">
					{this.props.pet.animal || ''} &nbsp;
					<i className={`fas fa-${this.props.pet.animal.toLowerCase()}`} />
				</div>
				<div className="event-description">
					{this.props.pet.description || ''}
				</div>

				<div className="d-flex justify-content-even pet-card-button-wrapper">
					<Button
						className="card-button event-delete-button"
						onClick={this.deletePet.bind(this)}
					>
						<i className="far fa-trash-alt small-btn " />
					</Button>

					<Button
						className="card-button event-edit-button"
						onClick={this.modalToggle}
					>
						<i className="fas fa-pen small-btn " />
					</Button>
				</div>

				<PetModal
					modalOpen={this.state.modalOpen}
					toggleModal={this.modalToggle}
					handler={pet => this.updatePet(pet)}
					pet={this.props.pet}
				/>
			</div>
		);
	}
}
