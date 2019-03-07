import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
} from 'reactstrap';

export default class Home extends Component {
	render() {
		return (
			<div className="wrapper">
				<div className="container">
					<div className="row">
						<div className="col-12 d-flex align-items-center flex-column home-text ">
							<h1>Welcome to WePet</h1>
							<p>
                Running out of old tricks to entertain your pet at home? Looking
                for cute animals to play with?
								<br />
                We have found a solution for you!
							</p>
							<br />
							{!this.props.user ? (
								<Button className="btn-secondary" onClick={() => this.props.history.push('/loginsignup')}>
									Login/Signup
								</Button>
							) : (
								<div />
							)}
						</div>

						<div className="col-12 align-self-center profile-img">
							<img
								className="d-flex justify-content-center flex-end img-fluid "
								src="images/national-pet-day.jpg"
								alt="landing-page-pic"
							/>
						</div>
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
										Some quick example text to build on the
										card title and make up the bulk of the
										card's content.
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
										Some quick example text to build on the
										card title and make up the bulk of the
										card's content.
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
										Some quick example text to build on the
										card title and make up the bulk of the
										card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>{' '}
						</div>
					</div>
					<hr className="bighr" />
				</div>

				<footer>
					<Link to="/privacy">Privacy Policy</Link>
				</footer>
			</div>
		);
	}
}
