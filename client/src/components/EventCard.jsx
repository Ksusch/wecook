import React, { Component } from 'react';
import { Button } from 'reactstrap';
import EventModal from './EventModal';

export default class EventCard extends Component {
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
	deleteEvent() {
		this.props.deleteEvent(this.props.event._id);
	}
	updateEvent(event) {
		this.props.updateEvent(this.props.event._id, event);
	}
	render() {
		return (
			<div className="event-card d-flex flex-nowrap flex-column">
				<div className="event-card-top d-flex justify-content-between">
					<h3>{this.props.event.name}</h3>
				</div>
				<div>
					<div className="event-image-wrapper d-flex">
						{this.props.event.image === undefined ? (
							<i className="fas fa-camera fa-5x" />
						) : (
							<img src={this.props.event.image} alt="this event" />
						)}
					</div>
				</div>
				<div className="event-card-location">
					<i className={'fas fa-map-marker'} />
					{this.props.event.location.address || ''}
				</div>
				<hr />
				<div className="event-description">
					{this.props.event.description || ''}
				</div>
				<div className="d-flex justify-content-even pet-card-button-wrapper">
					<Button
						className="card-button event-delete-button"
						onClick={this.deleteEvent.bind(this)}
					>
						<i className="far fa-trash-alt" />
					</Button>

					<Button
						className="card-button event-edit-button"
						onClick={this.modalToggle}
					>
						<i className="fas fa-pen small-btn" />
					</Button>
				</div>
				<EventModal
					modalOpen={this.state.modalOpen}
					toggleModal={this.modalToggle}
					handler={event => this.updateEvent(event)}
					event={this.props.event}
				/>
			</div>
		);
	}
}
