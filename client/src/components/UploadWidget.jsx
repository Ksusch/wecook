import React, { Component } from "react";
import { Button } from "reactstrap";
import { ApiService } from "../api/api";

export default class UploadWidget extends Component {
	constructor(props) {
		super(props)
		this.ApiService = new ApiService()
	}
	uploadWidget() {
		if (this.props.imageType === "profilePic") {
			console.log("i fired")
			window.cloudinary.openUploadWidget(
				{ cloud_name: "dgxu6dbuw", upload_preset: "profilePic" },
				function (err, res) {
					if (err) {
						console.log("got an error", err)
						console.error(err);
						return;
					}
					if (res.event === "success") {
						console.log(res.info)
						this.ApiService.addImageUrl(res.info.secure_url, "User")
							.then(user => {
								console.log("I have added the image in Upload Widget")
								this.props.handler(user)
							})
					}
					console.log("openuploadwiget event", res.event)
					console.log("openuploadwiget event", res)
				}.bind(this)
			)
		} else {
			window.cloudinary.openUploadWidget(
				{ cloud_name: "dgxu6dbuw", upload_preset: "petPic" },
				function (err, res) {
					if (err) {
						return;
					}
					return res.info.secure.url;
				}.then(url => this.ApiService.addImageUrl(url, "Pet"))
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
