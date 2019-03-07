import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle
} from 'reactstrap';

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
							Join the community and look for pets in your surrounding to visit,
							to sit or become a host for your pet.
						</p>

						{!this.props.user ? (
							<Button className="btn-secondary">
								<Link to="/loginSignup">Login/Signup</Link>
							</Button>
						) : (
							<div />
						)}
					</div>
					<hr className="bighr" />

					<div className="row profile-row">
						<div className="col-4">
							<Card>
								<CardImg
									top
									width="100%"
									src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Share your Pet</CardTitle>

									<CardText>
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</div>
						<div className="col-4">
							{' '}
							<Card>
								<CardImg
									top
									width="100%"
									src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Create an Event</CardTitle>

									<CardText>
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</div>
						<div className="col-4">
							{''}
							<Card>
								<CardImg
									top
									width="100%"
									src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Make New Pet Friends</CardTitle>

									<CardText>
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>{' '}
						</div>
					</div>
					<hr className="bighr" />
				</div>

				{/* <img
					className="resize d-flex justify-content-center"
					src="images/group-of-pets-together-15229056.jpg"
					alt="landing-page-pic"
				/> */}
				{/* <img
						className="resize "
						src="images/pets_and_money_hero_image_-_minus_guinea.png"
						alt="landing-page-pic"
					/> */}
				{/* <img
					className="d-flex justify-content-center flex-end img-fluid "
					src="images/national-pet-day.jpg"
					alt="landing-page-pic"
				/> */}
			</div>
		);
	}
}
