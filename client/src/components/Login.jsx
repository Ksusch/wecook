import React, { Component } from 'react'
import FormWrapper from "./FormElements";
export default class Login extends Component {
	render() {
		return (
			<div>
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
					handler={state => this.props.handler(state)}
          message={this.props.message}
				/>
			</div>
		);
	}
}