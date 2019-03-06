import React, { Component } from 'react';
import PetModal from './PetModal';
import { Button } from 'reactstrap';

export default class AddPetButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			name: null,
			animal: null,
			description: null,
		};
		this.modalToggle = this.modalToggle.bind(this);
	}

	modalToggle() {
		this.setState(prevState => ({
			modalOpen: !prevState.modalOpen,
		}));
	}
	addPet(pet) {
		this.props.handler(pet);
	}

	render() {
		return (
			<Button
				className="btn btn-primary add-pet-button"
				onClick={this.modalToggle}
			>
				<PetModal
					modalOpen={this.state.modalOpen}
					toggleModal={this.modalToggle}
					handler={pet => this.addPet(pet)}
					pet={{
						image: undefined,
						name: undefined,
						description: undefined,
					}}
				/>
				<i className="fas fa-plus fa-5x" />
			</Button>
		);
	}
}
