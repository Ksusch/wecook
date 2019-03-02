import React, { Component } from "react";
import { Container } from "reactstrap";
import FormWrapper from "../FormElements";
import api from "../../api/api";

export default class Login extends Component {
	handleLogin(state) {
		api.login(state).then(res => {
			this.props.history.push("/home");
		});
	}
	render() {
		return (
			<Container>
				<h2>Login</h2>
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
					]}
					button={{
						type: "submit",
						class: "",
						text: "Submit",
					}}
					handler={state => this.handleLogin(state)}
				/>
			</Container>
		);
	}
}
