import React, { Component } from "react";
import { Button } from "reactstrap";
import api from "../api";

export default class UploadWidget extends Component {
	uploadWidget() {
		if (this.props.imageType === "profilePic") {
			window.cloudinary.openUploadWidget(
				{ cloud_name: "dgxu6dbuw", upload_preset: "profilePic" },
				function(err, res) {
					if (err) {
						console.error(err);
						return;
					}
					return res.info.secure.url;
				}.then(url => api.addImageUrl(url, "userProfile"))
			);
		} else {
			window.cloudinary.openUploadWidget(
				{ cloud_name: "dgxu6dbuw", upload_preset: "petPic" },
				function(err, res) {
					if (err) {
						console.error(err);
						return;
					}
					return res.info.secure.url;
				}.then(url => api.addImageUrl(url, "petProfile"))
			);
		}
	}
	render() {
		return (
			<React.Fragment>
				<Button
					className={this.props.class || ""}
					onClick={this.uploadWidget.bind(this)}
				>
					Add Picture
				</Button>
			</React.Fragment>
		);
	}
}
