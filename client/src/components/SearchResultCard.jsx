import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class SearchResultCard extends Component {
	render() {
		return (
			<Card className="search-result-card">
				<CardImg top width="100%" src={this.props.event.image} alt="Card image cap" />
				<CardBody>
					<CardTitle>{this.props.event.name}</CardTitle>
					<CardText>{this.props.event.description}</CardText>
				</CardBody>
			</Card>
		);
	}
}
