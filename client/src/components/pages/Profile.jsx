import React, { Component } from 'react';
//import UploadWidget from '../UploadWidget';
import { ApiService } from '../../api/api';
import UpdateUserModal from '../UpdateUserModal';
import Img from 'react-image';
import { Button } from 'reactstrap';
import '../../styles.scss';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
		this.ApiService = new ApiService();
		this.modalToggle = this.modalToggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleImage = this.handleImage.bind(this);
		this.handleUserUpdate = this.handleUserUpdate.bind(this);
	}
	modalToggle() {
		this.setState(prevState => ({
			modalOpen: !prevState.modalOpen
		}));
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
	handleUserUpdate(state) {
		this.ApiService.updateUser(state).then(user => this.props.handler(user));
	}
	render() {
		console.log('user object as received in props', this.props.user.image);
		return (
			<div>
				<div className="container mt-sm-4 mb-5">
					<div id="test" className="row">
						<div className="col-lg-4 pb-md-1 pl-5 justify-content-md-center">
							{this.props.user.image == '' ? (
								<i className="fas fa-user-alt fa-3x" />
							) : (
								<Img
									className="profile-pic"
									src={this.props.user.image}
									alt="profile"
								/>
							)}
						</div>
					</div>
					<div id="test" className="col text-center">
						<h3>Welcome - {this.props.user.name}!</h3>
						<br />
					</div>
					<div id="test" className="col text-center">
						<p>
							<strong>Bio:</strong> {this.props.user.about}
						</p>
					</div>
					<div>
						<Button className="btn btn-primary" onClick={this.modalToggle}>
							<i className="fas fa-pencil-alt" />
						</Button>
						<UpdateUserModal
							user={this.props.user}
							modalOpen={this.state.modalOpen}
							toggleModal={this.modalToggle}
							handler={state => this.handleUserUpdate(state)}
							user={this.props.user}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
