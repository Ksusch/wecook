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
		console.log(this.props);
		this.props.handleDelete(this.props.pet._id);
	}
	updatePet(pet) {
		console.log('in pet card, pet in props is', this.props.pet);
		this.props.handleUpdate(this.props.pet._id, pet);
	}
	render() {
		return (
			<div className="pet-card d-flex flex-nowrap justify-content-between">
				<div className="pet-card-button-wrapper">
					<div>
						<Button
							className="btn btn-outline-success"
							onClick={this.deletePet.bind(this)}
						>
							<i className="far fa-trash-alt" />
						</Button>
					</div>
					<div>
						<Button
							className="btn btn-outline-success"
							onClick={this.modalToggle}
						>
							<i className="fas fa-pen small-btn" />
						</Button>
					</div>
				</div>
				<div>
					<div className="pet-image-wrapper">
						{this.props.pet.image ? (
							<img src={this.props.pet.image} alt="this pet" />
						) : (
							<img src="" alt="this pet" />
						)}
					</div>
				</div>
				<div>
					<ul className="pet-details">
						<li>Name: {this.props.pet.name || ''}</li>
						<li>
							Animal: {this.props.pet.animal || ''}
							<i className={`fas fa-${this.props.pet.animal.toLowerCase()}`} />
						</li>
					</ul>
					<div className="pet-description">
						{this.props.pet.description || ''}
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
