import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Home extends Component {
	render() {
		return (
			<div className="home-component">
				<div className="header d-flex">
					<h1>Welcome to WePet</h1>
					<i className="fas fa-paw fa-2x" />
					{/* <img src="../../images/pawprint.png" alt="paws" /> */}
				</div>
				{/* <UploadWidget imageType="profilePic" /> */}
				<div className="d-flex justify-content-center">
					<div className="left-container">
						<p>A website by pet-lovers to pet-lovers.</p>
						<p>
							Join the community and look for pets in your
							surrounding to visit, to sit or become a host for
							your pet.
						</p>

						{!this.props.user ? (
							<Button className="btn-secondary">
								<Link to="/loginSignup">Login/Signup</Link>
							</Button>
						) : (
							<div />
						)}
					</div>

					<div className="circular">
						<img
							src="../../images/home-image.jpg"
							alt="welcome"
						/>
					</div>
				</div>
			</div>
		);
	}
}
