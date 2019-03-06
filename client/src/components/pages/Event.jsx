import React, { Component } from 'react';
import { Button } from 'reactstrap';
export default class Event extends Component {
	render() {
		return (
			<div>
				<Button
					className="btn btn-primary"
							
				>
					<i className="fas fa-arrow-left" /> Back
				</Button>
			</div>
		);
	}
}
