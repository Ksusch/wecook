// code in this file is based on an excellent medium article
// link: https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105

import React, { Component } from "react";
import io from "socket.io-client";
import ServerUrl from "../api/api";

const providers = ["google", "facebook", "twitter"];
// socket.on('connect', () => {console.log(socket.id)});

// console.log(socket)
class OAuthWrapper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			socket: false	
		}
		this.socket = io(ServerUrl)
		this.checkSocket = this.checkSocket.bind(this)
	}
	
	componentDidMount() {
		this.checkSocket()
	}

	checkSocket() {
		let socketCheck;
		if (this.socket.id === undefined) {	
			// this.socket.on('reconnect_attempt', () => {console.log("reconnect_attempt: ", this.socket)})
			// this.socket.on('connect', () => {console.log("connect: ")})
			// this.socket.on('error', (error) => {console.log("error :", error)})
			// this.socket.on('disconnect', () => {console.log("disconnect :")})
			// this.socket.on('data', () => {console.log("data :")})
			// this.socket.on('message', () => {console.log("message :")})
			socketCheck = setInterval(() => {
				if (this.socket.id !== undefined) {
					this.setState({
						socket: true
					})
					clearInterval(socketCheck);
				}
			}, 500);
		}
	}

	render() {
		return (
			this.state.socket ? 
			<div className="d-flex">
				{providers.map(v => (
					<OAuth
						provider={v}
						key={v}
						socket={this.socket}
						handler={user => this.props.handler(user)}
					/>
				))}
			</div>
			:
			<div/>
		);
	}
}

class OAuth extends Component {
	state = {
		disabled: "",
	};

	componentDidMount() {
		this.props.socket.on(this.props.provider, user => {
			this.popup.close();
			this.props.handler(user);
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
			url = `${ServerUrl}/auth/${this.props.provider}?socketId=${
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
		let iconClass;
		if (this.props.provider === "google") {
			iconClass = "fab fa-google-plus-square";
		} else if (this.props.provider === "twitter") {
			iconClass = "fab fa-twitter-square";
		} else {
			iconClass = "fab fa-facebook-square";
		}
		return (
			<div className="oauth-container">
				<div className={"button-wrapper fadein-fast"}>
					<button
						onClick={this.startAuth.bind(this)}
						className={`${iconClass} provider-button`}
					/>
				</div>
			</div>
		);
	}
}

export default OAuthWrapper;
