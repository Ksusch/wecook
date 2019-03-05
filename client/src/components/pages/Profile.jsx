import React, { Component } from 'react';
import UploadWidget from '../UploadWidget';
import { ApiService } from '../../api/api';
import Img from 'react-image';
// import '../styles.scss';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			about: null
		};
		this.ApiService = new ApiService();
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleImage(url) {
		this.ApiService.updateUser({
			image: url
		}).then(user => this.props.handler(user));
	}
	handleSubmit(e) {
		e.preventDefault();
		if (this.state.name !== null || this.state.about !== null) {
			this.ApiService.updateUser(this.state)
				.then(user => this.props.handler(user));
		}
	}
	render() {
		console.log('user object as received in props', this.props.user);
		return (
			<div>
				<div className="container mt-sm-4 mb-5">
					<div id="test" className="row">
						<div className="col-lg-4 pb-md-1 pl-5 justify-content-md-center">
							<Img className="profile-pic" src={this.props.user.image} alt="profile" />
						</div>
						<div id="cameraContainer">
							{/* <img id="cameraimg" src="/images/camera.png" alt="editphoto" /> */}
							<i id="cameralogo" className="fas fa-camera-retro fa-2x"></i>
							<UploadWidget
								imageType="profilePic"
								handler={url => this.handleImage(url)}
								class="upload-widget"
							/>
						</div>
					</div>

					<div id="test" className="col text-center">
						<h3>Welcome - {this.props.user.name}!</h3><br />
					</div>
					<div id="test" className="col text-center">

						<p><strong>Bio:</strong> {this.props.user.about}</p>
					</div>
					<i id="cameraimg" className="fas fa-marker"></i>
				</div>



				<form onSubmit={(e) => this.handleSubmit(e)}>
          Name: <input type="text" name="name" onChange={(e) => this.handleChange(e)} />
          About: <input type="textarea" name="about" onChange={(e) => this.handleChange(e)} />
					<button type="submit">Submit me!</button>
				</form>

			</div >
		);
	}
}

export default Profile;
