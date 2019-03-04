import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Petcard from '../Petcard';
import { Link } from 'react-router-dom';

// import '../styles.scss';

export default class Profile extends Component {
  render() {
    return (
      <Container>
        <Container>
          <row className="userprofile">
            <h1>About you</h1>
            <img src={this.props.image} alt="userpic" className="center" />{' '}
            <br />
            Email:{this.props.email} <br />
            Address:{this.props.address} <br />
          </row>
        </Container>

        <row>
          <h1>Your lovely pet</h1>
          <Container className="petCardContainer">
            <Row>
              <Col>
                <Petcard />
              </Col>
              <Col>
                <Petcard />
              </Col>
              <Col>
                <Petcard />
              </Col>
            </Row>
          </Container>
          <Link to="/managePets" className="btn btn-primary">
            Manage your Pets
          </Link>
        </row>

        <row>
          <h1>The pets you have petted:</h1>
          <Petcard />
        </row>
      </Container>
    );
  }
}
