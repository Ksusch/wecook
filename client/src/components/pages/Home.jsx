import React, { Component } from 'react';
import CreateOffering from "../CreateOffering"
import { Container } from 'reactstrap'
export default class Home extends Component {
  render() {
    return (
      <Container>
          <CreateOffering/>
      </Container>
    );
  }
}
