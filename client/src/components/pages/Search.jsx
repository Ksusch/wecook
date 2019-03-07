import React, { Component } from 'react';
import {
	Container,
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon
} from 'reactstrap';
import MapBox from '../MapBox';
import SearchResultCard from '../SearchResultCard';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			results: [],
			events: []
		};
	}
	componentDidMount(){
		this.setState({
			events: this.props.events
		});
	}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props && this.props.events && this.props.events.length > 0) {
			this.setState({
				events: this.props.events
			});
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (this.state.search) {
			let search = new RegExp(this.state.search),
				results = this.state.events.filter(
					event =>
						search.test(event.name) ||
						search.test(event.desciption) ||
						search.test(event.location)
				);
			if (results.length && results.length > 0) {
				this.setState({ results: results });
			}
		}
	}
	render() {
		
		console.log('state in search', this.state);
		if(!this.state.events) return <div>Loading</div>;
		else return (
			<Container>
				<div className="search-wrapper d-flex flex-column">
					<div className="d-flex justify-content-between">
						<div className="search-box d-flex flex-column justify-content-center">
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
					</div>
					<MapBox
						locations={this.state.events.map(
							event => event.location.coordinates
						)}
					/>
					<div>
						<hr className="bighr" />
					</div>
					<h3>All Events</h3>
					<div className="search-results d-flex">
						{this.state.results.length > 0
							? this.state.results.map((event, i) => (
								<Button
									className="search-result-button"
									onClick={() =>
										this.props.history.push(`/event/${event._id}`)
									}
								>
									<SearchResultCard key={i} event={event} />
								</Button>
							  ))
							: this.state.events.map((event, i) => (
								<Button
									className="search-result-button"
									onClick={() =>
										this.props.history.push(`/event/${event._id}`)
									}
								>
									<SearchResultCard key={i} event={event} />
								</Button>
							  ))}
					</div>
				</div>
			</Container>
		);
	}
}
