import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import MapBox from '../MapBox';
import { ApiService } from '../../services/services';
export default class Event extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attending: false
		};
		this.ApiService = new ApiService();
	}
	componentDidMount() {
		this.getParticipants();
	}
	getParticipants() {
		this.ApiService.getParticipants(this.props.match.params.id).then(res => {
			let attending = res.participants.map(p => p.id).includes(res.currentUser);

			this.setState({
				participants: res.participants,
				owner: res.owner,
				ownerCurrent: res.ownerCurrent,
				attending: attending
			});
		});
	}
	addParticipant() {
		this.ApiService.addParticipant(this.props.match.params.id).then(res => {
			this.props.handleUpdate(res);
			this.getParticipants();
		});
	}
	removeParticipant() {
		this.ApiService.removeParticipant(this.props.match.params.id).then(res => {
			this.props.handleUpdate(res);
			this.getParticipants();
		});
	}
	render() {
		if (!this.props.event) return <div>loading</div>;
		else {
			return (
				<Container>
					<div>
						<Button
							className="btn btn-primary"
							onClick={() => this.props.history.push('/search')}
						>
							<i className="fas fa-arrow-left" /> Back
						</Button>
						<div className="d-flex justify-content-between">
							<div className="event-header">
								<h1>{this.props.event.name}</h1>
								<hr />
								<img src={this.props.event.image} alt="an event" />
							</div>
							<MapBox locations={[this.props.event.location.coordinates]} />
						</div>
						<div className="event-details">
							<hr className="bighr" />
							<div className="d-flex justify-content-between">
								{!this.state.ownerCurrent ? (
									this.state.attending ? (
										<Button onClick={() => this.removeParticipant()}>
											Unattend
										</Button>
									) : (
										<Button onClick={() => this.addParticipant()}>
											Attend
										</Button>
									)
								) : (
									<div />
								)}
								<h5>Address: {this.props.event.location.address}</h5>
							</div>
							<p>{this.props.event.description}</p>
							<div className="owner-wrapper">
								<h2>Owner</h2>
								<img
									src={this.state.owner && this.state.owner.image}
									alt="owner"
								/>
								<br />
								<span>{this.state.owner && this.state.owner.name}</span>
							</div>

							<div className="participants-wrapper">
								<h2>Participants</h2>
								{this.state.participants &&
									this.state.participants.map((participant, i) => (
										<div className="participant-wrapper" key={i}>
											<img src={participant.image} alt="participant" />
											<br />
											<span>{participant.name}</span>
										</div>
									))}

								{this.state.participants && !this.state.participants.length && (
									<div>No participants registered, yet.</div>
								)}
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</Container>
			);
		}
	}
}
