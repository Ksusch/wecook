import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class UploadWidget extends Component {
	uploadWidget() {
		window.cloudinary.openUploadWidget(
			{ cloud_name: 'dgxu6dbuw', upload_preset: [this.props.imageType] },
			function(err, res) {
				if (err) {
					console.error(err);
					return;
				}
				if (res.event === 'success') {
					this.props.handler(res.info.url);
				}
			}.bind(this)
		);
	}
	render() {
		return (
			<React.Fragment>
				<Button
					className={this.props.class || ''}
					onClick={this.uploadWidget.bind(this)}
				>
					<i className="fas fa-camera"></i>
				</Button>
			</React.Fragment>
		);
	}
}
