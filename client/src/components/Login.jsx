import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
		};
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.handler(this.state);
	}
	render() {
		return (
			<div className="login-wrapper">
				<Form onSubmit={e => this.handleSubmit(e)}>
					<FormGroup>
						<Input
							type="email"
							name="email"
							placeholder="JonSnow@winterfeld.net"
							onChange={e => this.handleChange(e)}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type="password"
							name="password"
							placeholder="Your password"
							onChange={e => this.handleChange(e)}
						/>
					</FormGroup>
					<FormGroup className="d-flex justify-content-between">
						<Button className="btn btn-primary" onClick={e => this.props.handleToggle(e)}>
							<i className="fas fa-arrow-left" /> Back
						</Button>
						
						<Button className="btn btn-primary" onClick={e => this.props.toggleSignup(e)}>
							<i className="fas fa-user-plus fa-1x" /> Signup
						</Button>
						<Button type="submit" className="btn btn-primary">
							<i className="fas fa-sign-in-alt fa-1x" /> Login
						</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}
