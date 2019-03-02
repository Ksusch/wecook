import React, { Component } from 'react';
import { Container } from 'reactstrap';
import UploadWidget from '../UploadWidget';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <h2>Welcome</h2>
        {/* <UploadWidget imageType="profilePic" /> */}
        <div className="home-container">
          <p className="left-container">
            A website from pet-lovers to pet-lovers.
            <br />
            You want to give an opportunity ...
          </p>
          <div className="circular">
            <img
              className="home-image"
              src="../../images/home-image.jpg"
              alt="pets"
            />
          </div>
        </div>
      </Container>
    );
  }
}
