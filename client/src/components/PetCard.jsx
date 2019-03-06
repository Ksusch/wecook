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
			<div className="pet-card d-flex flex-nowrap justify-content-between">
				<div className="card-top">
					<div>
						<ul className="pet-details">
							<h3> {this.props.pet.name || ''}</h3>
							<li>
								Animal: {this.props.pet.animal || ''} &nbsp;
								<i
									className={`fas fa-${this.props.pet.animal.toLowerCase()}`}
								/>
							</li>
						</ul>
						<div className="pet-description">
							{this.props.pet.description || ''}
						</div>
					</div>
					<div>
						<div className="pet-image-wrapper">
							{this.props.pet.image === undefined ? (
								<i className="fas fa-camera fa-2x" />
							) : (
								<img
									src={this.props.pet.image}
									className="profile-pic"
									alt="this pet"
								/>
							)}
						</div>
					</div>
				</div>
				<div className="pet-card-button-wrapper">
					<div>
						<Button
							className="btn btn-primary pet-card-button"
							onClick={this.deletePet.bind(this)}
						>
							<i className="far fa-trash-alt small-btn " />
						</Button>
					</div>
					<div>
						<Button
							className="btn btn-primary pet-card-button"
							onClick={this.modalToggle}
						>
							<i className="fas fa-pen small-btn " />
						</Button>
					</div>
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
