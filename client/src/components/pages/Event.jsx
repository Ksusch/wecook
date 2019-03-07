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
	componentDidUpdate(){
		this.getParticipants();	
	}
	getParticipants(){
		this.ApiService.getParticipants(this.props.match.params.id);
		// .then(res => { 
		// 	this.setState({
		// 		participants: res.data.participants.map(v => {v.name, v.image;})
		// 	});

		// });
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
							<div className="d-flex justify-content-around">
								<div className="event-img-wrapper">
									<img src={this.props.event.image} alt="an event picture"/>
								</div>
								<div className="d-flex flex-column align-items-start">
									<p>
										{this.props.event.description}
									</p>
									<h2>owner</h2>
									{this.props.event.owner}
									<h2>participants</h2>
									{this.props.event.participants}
									{
										!this.state.attending ?
											<Button className="mt-auto align-self-end" onClick={() => this.addParticipant()}>Attend</Button>
											:
											<Button className="mt-auto align-self-end" onClick={() => this.removeParticipant()}>Unattend</Button>
									}
								</div>

							</div>
						</div>
					</div>
					<div className="event-details">
						<hr/>
						<div className="d-flex justify-content-between">
							
							<h5>Address: {this.props.event.location.address}</h5>
						</div>
					
					
					</div>
						<MapBox locations={[this.props.event.location.coordinates]}/>
				</div>
				
			</Container>
		);
	}
}
