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
		this.props.handleDelete(this.props.event._id);
	}
	updateEvent(event) {
		this.props.handleUpdate(this.props.event._id, event);
	}
	render() {
		return (
			<div className="event-card d-flex flex-nowrap justify-content-between">
				<div className="event-card-button-wrapper">
					<div>
						<Button
							className="btn btn-outline-success"
							onClick={this.deleteEvent.bind(this)}
						>
							<i className="far fa-trash-alt" />
						</Button>
					</div>
					<div>
						<Button
							className="btn btn-outline-success"
							onClick={this.modalToggle}
						>
							<i className="fas fa-pen small-btn" />
						</Button>
					</div>
				</div>
				<div>
					<div className="event-image-wrapper">
						{this.props.event.image === undefined ? (
							<i className="fas fa-camera"></i>
						) : (
							<img src={this.props.event.image} alt="this event" />
						)}
					</div>
				</div>
				<div>
					<ul className="event-details">
						<li>Name: {this.props.event.name || ''}</li>
						<li>
							Animal: {this.props.event.animal || ''}
							<i className={`fas fa-${this.props.event.animal.toLowerCase()}`} />
						</li>
					</ul>
					<div className="event-description">
						{this.props.event.description || ''}
					</div>
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