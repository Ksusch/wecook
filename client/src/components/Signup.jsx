import React, { Component } from 'react'
import FormWrapper from "./FormElements";
export default class Signup extends Component {
    render() {
      return (
        <div>
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
            handler={state => this.props.handler(state)}
            message={this.props.message}
          />
        </div>
      );
    }
  }