import React, { Component } from 'react';
import {
	Container,
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import { ApiService } from '../../api/api';
import EventCard from '../EventCard';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			results: [],
			events: [],
		};
		this.ApiService = new ApiService();
	}
	componentDidMount() {
		this.ApiService.getEventsInRadius().then(events =>
			this.setState({ events: events.data })
		);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (
			this.state.search.length != undefined &&
			this.state.search.length > 2
		) {
			let search = new RegExp(this.state.search),
				results = this.state.events.filter(
					event =>
						search.test(event.name) ||
						search.test(event.desciption) ||
						search.test(event.location)
				);
			if (results.length > 0) {
				this.setState({ results: results });
			}
		}
	}
	render() {
		console.log('state in search', this.state);
		return (
			<Container>
				<div className="search-wrapper d-flex flex-column">
					<div className="search-box">
						<Form onSubmit={e => this.handleSubmit(e)}>
							<FormGroup>
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										<div className="prepend-box">
											<i className="fas fa-search fa-2x" />
										</div>
									</InputGroupAddon>
									<Input
										value={this.state.search}
										onChange={e => this.handleChange(e)}
										type="text"
										name="search"
										placeholder="Search events near you"
									/>
								</InputGroup>
							</FormGroup>
						</Form>
					</div>
					<hr />
					<div className="search-results">
						{
							this.state.results.length > 0
								? this.state.results.map((event, i) => (
									<EventCard
										key={i}
										event={event}
										search={true}
									/>
							  ))
								: this.state.events.map((event, i) => (
									<EventCard
										key={i}
										event={event}
										search={true}
									/>
							  ))
						}
					</div>
				</div>
			</Container>
		);
	}
}
