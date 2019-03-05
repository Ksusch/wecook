import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
	render() {
		return (
			<div>
				<div className="header">
					<h1>Welcome to WePet</h1> &nbsp;
					<i className="fas fa-paw fa-2x" />
					{/* <img src="../../images/pawprint.png" alt="paws" /> */}
				</div>
				{/* <UploadWidget imageType="profilePic" /> */}
				<div className="home-container">
					<div className="left-container">
						<p>A website by pet-lovers to pet-lovers.</p>
						<p>
              Join the community and look for pets in your surrounding to visit,
              to sit or become a host for your pet.
						</p>

						{!this.props.user ? (
							<button type="button" className="btn btn-dark">
								<Link to="/loginSignup">Login/Signup</Link>
							</button>
						) : (
							<div />
						)}
					</div>

					<div className="profile-pic">
						<img
							className="home-image"
							src="../../images/home-image.jpg"
							alt="welcome"
						/>
					</div>
				</div>
			</div>
		);
	}
}
