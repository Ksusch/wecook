import React, { Component } from 'react';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button
} from 'reactstrap';
import '../styles.scss';

export default class Petcard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pet: null
		}
	}
	
	render() {
		return (
			<div>
				<Card>
					<CardImg top width="100%" src={this.props.image} alt="Card image cap" />
					<CardBody>
						<CardTitle>Name:{this.props.name}</CardTitle>
						<CardSubtitle>Animal:{this.props.animal}</CardSubtitle>
						<CardText>Description:{this.props.description}</CardText>
						<Button>Contact me!</Button>
					</CardBody>
				</Card>
			</div>
		)
	}
}
