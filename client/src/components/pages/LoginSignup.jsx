import React, { Component } from "react";
import OAuthWrapper from "../OAuth";
import { AuthService } from "../../api/api";
import Login from "../Login";
import Signup from "../Signup";

export default class LoginSignup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			signupStatus: false,
			loginStatus: false,
			singupPossible: true,
			loginPossible: true,
			OAuthpossible: true,
		};
		this.AuthService = new AuthService();
	}
	handleLogin(state) {
		this.AuthService.login(state)
			.then(user => {
				console.log("need to extract user at this point from the response and pass the state up!")
				this.props.handler(user)
			})
			.catch(err => console.error(err))
	}
	handleSignup(state) {
		this.AuthService.signup(state)
			.then(res => {
				this.setState({ message: res.message });
			})
			.catch(err => console.error(err))
	}
	render() {
		return (
			<div>
				<div>
					<OAuthWrapper
						handler={user => this.props.handler(user)}
					/>
				</div>
				<div>
					<div>
						<Login
							handler={state => this.handleLogin(state)}
							message={this.state.message}
						/>
					</div>
					<div>
						<Signup
							handler={state => this.handleLogin(state)}
							message={this.state.message}
						/>
					</div>
				</div>	
			</div>
		);
	}
}
