import React, { Component } from 'react';
import { Container } from "reactstrap";
import FormWrapper from "../FormElements";
import api from '../../api';

export default class Signup extends Component {
  handleSignup(state) {
		api.signup(state).then(res => {
			this.props.history.push("/home");
		});
	}

	render() {
		return (
      <Container>
      <h2>Signup</h2>
			<FormWrapper
				formGroups={[
					
          {
						type: "email",
						name: "email",
						class: "",
						placeholder: "jonsnow@winterfeld.org",
					},
					{
						type: "password",
						name: "password",
						class: "",
						placeholder: "your password",
					},
          {
						type: "text",
						name: "name",
						class: "",
						placeholder: "Your name",
					},
          {
						type: "text",
						name: "address",
						class: "",
						placeholder: "Your address",
					},
				]}
				button={{
					type: "submit",
					class: "",
					text: "Submit",
				}}
				handler={state => this.handleSignup(state)}
			/>
      </Container>
		);
	}
}