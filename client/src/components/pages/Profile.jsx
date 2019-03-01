import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Petcard from '../Petcard';
// import '../styles.scss';


export default class Profile extends Component {
	render() {
		return (
			<Container>
				<row className="userprofile">
					<h1>Your Profile</h1>
					<img src={this.props.image} alt="userpic" className="center" /> <br />
					Email:{this.props.email} <br />
					Address:{this.props.address} <br />
				</row>
				<row>
					<h1>Your lovely pet:</h1>
					<Petcard />
				</row>

				<row>
					<h1>The pets you have petted:</h1>
					<Petcard />
				</row>


			</Container>



		)

	}
}