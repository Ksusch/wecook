import React, { Component } from "react";
import { Container } from "reactstrap";
import homeImage from "../../images/home-image.jpg";
import UploadWidget from "../UploadWidget";

export default class Home extends Component {
	render() {
		return (
			<Container>
					<h2>Welcome</h2>
					<UploadWidget imageType="profilePic" />
					<p className="left-container">A website for pet-lovers ...</p>
					<img className="home-image" src={homeImage} alt="pets" />
				</Container>
		);
	}
}
