import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import MapBox from '../MapBox';
export default class Event extends Component {
	
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
						<div className="event-details">
							<h1>{this.props.event.name}</h1>
							<hr/>
							<img src={this.props.event.image} alt="an event picture"/>
							<hr/>
							Address: {this.props.event.location.address}
							<br/>
							<hr/>
							{this.props.event.description}
						</div>
						<MapBox locations={[this.props.event.location.coordinates]}/>
					</div>
				</div>
				
			</Container>
		);
	}
}
