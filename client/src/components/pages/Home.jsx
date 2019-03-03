import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import Login from '../Login';
import Signup from '../Signup';
import UploadWidget from '../UploadWidget';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <div className="header">
          <h2>Welcome to wePet</h2>
          <img src="../../images/pawprint.png" alt="paws" />
        </div>
        {/* <UploadWidget imageType="profilePic" /> */}
        <div className="home-container">
          <div className="left-container">
            <p>A website from pet-lovers to pet-lovers.</p>
            <p>
              Join the community and look for pets in your surrounding to visit,
              to sit or become a host for your pet.
            </p>
            <Link to="/loginSignup">Signup/Login</Link>
          </div>
          <div className="circular">
            <img
              className="home-image"
              src="../../images/home-image.jpg"
              alt="welcome"
            />
          </div>
        </div>
      </Container>
    );
  }
}
