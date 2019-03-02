import React, { Component } from "react";
import io from "socket.io-client";
import FontAwesome from 'react-fontawesome';
import { Button } from "reactstrap";
const baseUrl = "http://localhost:4000/auth",
	socket = io(baseUrl),
	providers = ["google", "facebook", "twitter"];

class OAuthWrapper extends Component {
	render() {
		return (
			<div className="d-flex">
				{providers.map(provider => (
					<OAuth provider={provider} key={provider} socket={socket} />
				))}
			</div>
		);
	}
}

class OAuth extends Component {
	state = {
		user: {},
		disabled: "",
	};

	componentDidMount() {
		this.props.socket.on(this.props.provider, user => {
			this.popup.close();
			this.setState({ user });
		});
	}

	// Routinely checks the popup to re-enable the login button
	// if the user closes the popup without authenticating.
	checkPopup() {
		const check = setInterval(() => {
			const { popup } = this;
			if (!popup || popup.closed || popup.closed === undefined) {
				clearInterval(check);
				this.setState({ disabled: "" });
			}
		}, 1000);
	}

	// Launches the popup by making a request to the server and then
	// passes along the socket id so it can be used to send back user
	// data to the appropriate socket on the connected client.
	openPopup() {
		const width = 600,
			height = 600,
			left = window.innerWidth / 2 - width / 2,
			top = window.innerHeight / 2 - height / 2,
			url = `${baseUrl}/${this.props.provider}?socketId=${
				this.props.socket.id
			}`;

		return window.open(
			url,
			"",
			`toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
		);
	}

	// Kicks off the processes of opening the popup on the server and listening
	// to the popup. It also disables the login button so the user can not
	// attempt to login to the provider twice.
	startAuth(e) {
		if (!this.state.disabled) {
			e.preventDefault();
			this.popup = this.openPopup();
			this.checkPopup();
			this.setState({ disabled: "disabled" });
		}
	}

	closeCard() {
		this.setState({ user: {} });
	}

	render() {
		const providerName = this.props.provider[0].toUpperCase() + this.props.provider.substr(1)
		return (
			<div className="oauth-container">
				<Button onClick={this.startAuth.bind(this)} className="btn-info"> 
					<span className="provider-name">Continue with {providerName}</span> 					
					<FontAwesome name={this.props.provider}/>
				</Button>
			</div>			
		);
	}
}

export default OAuthWrapper;
