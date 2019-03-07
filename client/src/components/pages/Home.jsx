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
									height="100%"
									src="images/pet.png"
									alt="Card image cap"
								/>

								<CardBody>
									<CardTitle>Show your Pet</CardTitle>

									<CardText>
                    Update and uplaod you and your pet's profiles to introduce
                    him/her to connect with other pet lovers.
									</CardText>
									{/* <Button>Button</Button> */}
								</CardBody>
							</Card>
						</div>
						<div className="col-4">
							{' '}
							<Card>
								<CardImg
									top
									width="100%"
									height="100%"
									src="images/event.png"
									alt="Card image cap"
								/>
								<div className="test" />
								<CardBody>
									<CardTitle>Create an Event</CardTitle>

									<CardText>
                    Create an event and invite others to join. You know what
                    they say 'the more the merrier'!
									</CardText>
									{/* <Button>Button</Button> */}
								</CardBody>
							</Card>
						</div>
						<div className="col-4">
							{''}
							<Card className="home-card">
								<CardImg
									top
									width="100%"
									height="100%"
									src="images/newfriends.png"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Make New Friends</CardTitle>

									<CardText>
                    Participate in events or bring your pet to events to make
                    new pet abnd human friends.
									</CardText>
									{/* <Button>Button</Button> */}
								</CardBody>
							</Card>{' '}
						</div>
					</div>
					<hr className="bighr" />
				</div>

<<<<<<< HEAD
				{/* <div className="container">
					<h1 className="test-header">Testimonial</h1>

					<div className="row testimony-card">
						<div className="col-4 test-img-box">
							<img
								className="test-img d-flex align-items-center"
								src="images/dog.png"
								alt="test-img1"
							/>
							<br />
              Mr.Pug{' '}
						</div>
						<div className="col-8 test-textbox">
							<p className="test-text">
                "I cannot deal with my owner all by myself indoors every single
                day! Thanks to Wepet, we got some fresh air and meet new
                friends!"
							</p>
						</div>
					</div>
				</div> */}
=======
				<footer>
					<Link to="/privacy">Privacy Policy</Link>
				</footer>
>>>>>>> 4fe55b82e0ebfc7007c6ad33dfeb134bce420e24
			</div>
		);
	}
}
