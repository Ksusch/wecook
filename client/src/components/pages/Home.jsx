import React, { Component } from "react";
import { Container } from "reactstrap";
import UploadWidget from "../UploadWidget";

export default class Home extends Component {
	render() {
		return (
			<Container>
				<h2>Login</h2>
				<UploadWidget imageType="profilePic" />
			</Container>
		);
	}
}
