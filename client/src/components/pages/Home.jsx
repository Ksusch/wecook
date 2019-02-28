import React, { Component } from "react";
import { Container } from "reactstrap";
import { UploadWidget } from "../FormElements";
import api from "../../api";

export default class Home extends Component {
  handleFileUpload(image) {
		api.uploadImage(image)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log("Error while uploading file: ", err);
			});
	};
	render() {
		return (
			<Container>
      <h2>Login</h2>
      <UploadWidget/>
      </Container>
		);
	}
}
