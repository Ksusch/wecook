import React, { Component } from 'react';
import EventModal from './EventModal';
import { Button } from 'reactstrap';

export default class AddEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.modalToggle = this.modalToggle.bind(this);
	}
	modalToggle() {
		this.setState(prevState => ({
			modalOpen: !prevState.modalOpen
		}));
	}
	addEvent(event) {
		console.log('fired on add event');
		this.props.handler(event);
	}
	render() {
		return (
			<Button
				className="btn btn-primary"
				onClick={this.modalToggle}
			>
				<i className="fas fa-plus" />
				<EventModal
					modalOpen={this.state.modalOpen}
					toggleModal={this.modalToggle}
					handler={event => this.addEvent(event)}
					event={{
						name: undefined,
						description: undefined,
						location: undefined,
						image: undefined
					}}
				/>
			</Button>
		);
	}
}
