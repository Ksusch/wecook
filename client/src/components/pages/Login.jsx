import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
      api.login(this.state.email, this.state.password).then(res => {
        this.props.history.push('/');
      });
    }
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
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
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
