import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import MapBox from '../MapBox';
import { ApiService } from '../../services/services';
export default class Event extends Component {
	constructor(props){
		super(props);
		this.state = {
			attending: false
		};
		this.ApiService = new ApiService();
	}
	getParticipants(){
		this.ApiService.getParticipants().then(participants => this.setState({participants: participants}));
	}
	addParticipant(){
		this.ApiService.addParticipant().then(res =>
			this.props.handleUpdate(res)
		);
	}
	removeParticipant(){
		this.ApiService.removeParticipant().then(res =>
			this.props.handleUpdate(res)
		);
	}
	render() {
		console.log(this.props);
		if(!this.props.event) return <div>loading</div>;
		else return (
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
							<hr/>
							<img src={this.props.event.image} alt="an event picture"/>
						</div>
						<MapBox locations={[this.props.event.location.coordinates]}/>
					</div>
					<div className="event-details">
						<hr/>
						<div className="d-flex justify-content-between">
							{
								!this.state.attending ?
									<Button onClick={() => this.addParticipant()}>Attend</Button>
									:
									<Button onClick={() => this.removeParticipant()}>Unattend</Button>
							}
							<h5>Address: {this.props.event.location.address}</h5>
						</div>
						<p>
							{this.props.event.description}
						</p>
					</div>
				</div>
				
			</Container>
		);
	}
}
