import React, { Component } from 'react';
import UploadWidget from '../UploadWidget';
import { ApiService } from '../../api/api';
import Img from 'react-image';
import PetCard from '../PetCard';
import AddPetButton from '../AddPetButton';
// import '../styles.scss';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.ApiService = new ApiService();
	}
	handleImage(url) {
		this.ApiService.updateUser({
			image: url
		}).then(user => this.props.handler(user));
	}
	handleDelete(id) {
		console.log('handleDelete fired on profile');
		this.ApiService.deletePet(id).then(res => this.props.handleUpdate(res));
	}
	handleUpdate(id, pet) {
		let petData = {};
		if (pet.name) petData.name = pet.name;
		if (pet.animal) petData.animal = pet.animal;
		if (pet.description) petData.description = pet.description;
		if (pet.image) petData.image = pet.image;
		this.ApiService.updatePet(id, petData);
	}
	updatePet(pet) {
		this.ApiService.createPet(pet).then(res => this.props.handleUpdate(res));
	}
	render() {
		return (
			<div>
				<div className="pet-card-container">
					{this.props.pets !== null ? (
						this.props.pets.map((pet, i) => (
							<PetCard
								key={i}
								pet={pet}
								handleDelete={id => this.handleDelete(id)}
								handleUpdate={(id, pet) => this.handleUpdate(id, pet)}
							/>
						))
					) : (
						<div />
					)}
				</div>
				<div>
					<AddPetButton handler={pet => this.updatePet(pet)} />
				</div>
			</div>
		);
	}
}

export default Profile;
