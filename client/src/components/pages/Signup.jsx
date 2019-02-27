import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      address: '',
      name: '',
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      api.signup(this.state.email, this.state.password, this.state.address, this.state.name);
    }
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="your email"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="address"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
