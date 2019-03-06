// code in this file is based on an excellent medium article
// link: https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105

import React, { Component } from "react";
import io from "socket.io-client";
import ServerUrl from "../services/services";
import { Button } from "reactstrap";
const providers = ["google", "facebook", "twitter"];
class OAuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: false
    };
    this.socket = io(ServerUrl);
    this.checkSocket = this.checkSocket.bind(this);
  }

  checkSocket() {
    let socketCheck;
    if (this.socket.id === undefined) {
      socketCheck = setInterval(() => {
        if (this.socket.id !== undefined) {
          this.setState({
            socket: true
          });
          clearInterval(socketCheck);
        }
      }, 500);
    }
  }
  componentDidMount() {
    this.checkSocket();
  }

	render() {
		return (
			this.state.socket ? 
			<React.Fragment>
				{providers.map(v => (
					<OAuth
						provider={v}
						key={v}
						socket={this.socket}
						handler={user => this.props.handler(user)}
					/>
				))}
			</React.Fragment>
			:
			<div/>
		);
	}
}

class OAuth extends Component {
  state = {
    disabled: ''
  };

  componentDidMount() {
    this.props.socket.on(this.props.provider, user => {
      this.popup.close();
      this.props.handler(user);
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

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
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

	render() {
		let iconClass;
		if (this.props.provider === "google") {
			iconClass = "fab fa-google fa-3x";
		} else if (this.props.provider === "twitter") {
			iconClass = "fab fa-twitter fa-3x";
		} else  {
			iconClass = "fab fa-facebook-f fa-3x";
		}	
		let providerName = this.props.provider[0].toUpperCase() + this.props.provider.substr(1)
		return (
			<div>
				<Button
					onClick={this.startAuth.bind(this)}
					className="btn btn-primary connection-icon"
				>
				<i className={`${iconClass}`}/>{providerName}
				</Button>
			</div>
		);
	}
}

export default OAuthWrapper;