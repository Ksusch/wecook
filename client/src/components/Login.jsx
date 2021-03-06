import React, { Component } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon
} from 'reactstrap';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null
		};
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.handler(this.state);
	}
	render() {
		return (
			<div className="form-wrapper">
				<Form onSubmit={e => this.handleSubmit(e)}>
					<FormGroup>
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<div className="prepend-box">
									<i className="fas fa-envelope fa-2x" />
								</div>
							</InputGroupAddon>
							<Input
								type="email"
								name="email"
								placeholder="JonSnow@winterfell.net"
								onChange={e => this.handleChange(e)}
							/>
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<div className="prepend-box">
									<i className="fas fa-unlock fa-2x" />
								</div>
							</InputGroupAddon>
							<Input
								type="password"
								name="password"
								placeholder="Your password"
								onChange={e => this.handleChange(e)}
							/>
						</InputGroup>
					</FormGroup>
					<FormGroup className="d-flex justify-content-between">
						<Button color="secondary" onClick={e => this.props.handleToggle(e)}>
							<i className="fas fa-arrow-left" /> Back
						</Button>

						<Button color="secondary" onClick={e => this.props.toggleSignup(e)}>
							<i className="fas fa-user-plus fa-1x" /> Signup
						</Button>
						<Button type="submit" color="secondary">
							<i className="fas fa-sign-in-alt fa-1x" /> Login
						</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}
