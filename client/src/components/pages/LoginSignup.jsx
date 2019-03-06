import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { AuthService } from '../../services/services';
import OAuthWrapper from '../OAuth';
import Login from '../Login';
import Signup from '../Signup';

export default class LoginSignup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: false,
			signup: false,
			confirm: false
		};
		this.AuthService = new AuthService();
		this.toggleLogin = this.toggleLogin.bind(this);
		this.toggleSignup = this.toggleSignup.bind(this);
	}
	toggleLogin(e) {
		if (e)
			this.setState(prevState => ({
				login: !prevState.login
			}));
	}
	toggleSignup(e) {
		if (e)
			this.setState(prevState => ({
				signup: !prevState.signup
			}));
	}
	handleLogin(state) {
		this.AuthService.login(state)
			.then(user => {
				this.props.handler(user);
			})
			.catch(err => console.error(err));
	}
	handleSignup(state) {
		this.AuthService.signup(state)
			.then(res => {
				if (res.status && res.status === 200) {
					this.setState({
						confirm: true,
						login: false,
						signup: false
					});
				}
			})
			.catch(err => console.error(err));
	}
	render() {
		return (
			<Container>
				<div>
					{this.state.confirm ? (
						<div>
            A confirmation has been sent to your email. Please check your inbox
            and follow the link provided in the confirmation email.
						</div>
					) : this.state.signup ? (
						<div>
							<Signup
								handler={state => this.handleSignup(state)}
								handleToggle={e => this.toggleSignup(e)}
							/>
						</div>
					) : this.state.login ? (
						<Login
							handler={state => this.handleLogin(state)}
							handleToggle={e => this.toggleLogin(e)}
							toggleSignup={e => this.toggleSignup(e)}
						/>
					) : (
						<div className="d-flex flex-column justify-content-center loginsignup-main">
							<h5 className="automargin" id="proceed-with">
              Proceed with
							</h5>
							<div className="automargin d-flex justify-content-between flex-wrap loginsignup-wrapper">
								<OAuthWrapper handler={user => this.props.handler(user)} />
								<div>
									<Button
										className="connection-icon btn btn-primary"
										name="login"
										onClick={e => this.toggleLogin(e)}
									>
										<i className="far fa-envelope fa-3x" />
                  Email
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</Container>
		);
	}
}
