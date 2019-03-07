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
	componentDidMount(){
		this.getParticipants();	
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps === this.props && prevState === this.state) return false;
	}
	getParticipants(){
		this.ApiService.getParticipants(this.props.match.params.id)
			.then(res => {
				let attending = res.participants.includes(res.currentUser) ? true : false;
				this.setState({
					participants: res.participants,
					owner: res.owner,
					ownerCurrent: res.ownerCurrent,
					attending: attending
				});
			});
	}
	addParticipant(){
		this.ApiService.addParticipant().then(res =>
			this.props.handleUpdate(res)
		);
		this.setState({attending: true});
	}
	removeParticipant(){
		this.ApiService.removeParticipant().then(res =>
			this.props.handleUpdate(res)
		);
		this.setState({attending: false});
	}
	render() {
		console.log(this.state);
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
								!this.state.ownerCurrent ?
									(
										this.state.attending ?
											<Button onClick={() => this.removeParticipant()}>Unattend</Button>
											:
											<Button onClick={() => this.addParticipant()}>Attend</Button>
									)
									:
									(<div/>)
			
							}
							<h5>Address: {this.props.event.location.address}</h5>
						</div>
						<p>
							{this.props.event.description}
						</p>
						<h2>owner</h2>
						<img src={this.state.owner && this.state.owner.image} alt="owner photo"/>
						<br/>
						<span>{this.state.owner && this.state.owner.name}</span>	
						
						<h2>participants</h2>
						
						{this.state.participants && this.state.participants.map(participant => (
							<div className="participant-wrapper">
								<img src={participant.image} alt="participant photo"/>
								<br/>
								<span>{participant.name}</span> 
							</div>	
						))}
					</div>
				</div>
			</Container>
		);
	}
}
