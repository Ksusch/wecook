import React, { Component } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			email: null,
			password: null,
			passwordConfirm: null,
		};
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (
			this.state.name &&
			this.state.name.length > 2 &&
			this.state.password &&
			this.state.password === this.state.passwordConfirm &&
			this.state.password.length > 5 &&
			this.state.email &&
			this.state.email.length > 5 &&
			this.state.email.includes('@')
		) {
			this.props.handler(this.state);
		} else {
			this.setState({
				name: null,
				email: null,
				password: null,
				passwordConfirm: null,
			});
		}
	}
	render() {
		return (
			<div className="form-wrapper">
				<Form onSubmit={e => this.handleSubmit(e)}>
					<FormGroup>
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<div className="prepend-box">
									<i className="fas fa-pen fa-2x" />
								</div>
							</InputGroupAddon>
							<Input
								type="text"
								name="name"
								placeholder="Jon Snow"
								onChange={e => this.handleChange(e)}
							/>
						</InputGroup>
					</FormGroup>
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
								placeholder="JonSnow@winterfeld.net"
								onChange={e => this.handleChange(e)}
							/>
						</InputGroup>
					</FormGroup>
					<FormGroup />
					<FormGroup className="d-flex justify-content-center">
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<div className="prepend-box">
									<i className="fas fa-unlock fa-2x" />
								</div>	
							</InputGroupAddon>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								onChange={e => this.handleChange(e)}
							/>
						</InputGroup>
						<InputGroup>
							<Input
								type="password"
								name="passwordConfirm"
								placeholder="Confirm"
								onChange={e => this.handleChange(e)}
							/>
						</InputGroup>
					</FormGroup>
					<FormGroup className="d-flex justify-content-between">
						<Button
							className="btn btn-primary"
							onClick={e => this.props.handleToggle(e)}
						>
							<i className="fas fa-arrow-left" /> Back
						</Button>
						<Button type="submit" className="btn btn-primary">
							<i className="fas fa-user-plus fa-1x" /> Signup
						</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}
