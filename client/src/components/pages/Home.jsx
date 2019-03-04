import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h2>Welcome to wePet</h2>
          <img src="../../images/pawprint.png" alt="paws" />
        </div>
        {/* <UploadWidget imageType="profilePic" /> */}
        <div className="home-container">
          <div className="left-container">
            <p>A website by pet-lovers to pet-lovers.</p>
            <p>
              Join the community and look for pets in your surrounding to visit,
              to sit or become a host for your pet.
            </p>
<<<<<<< HEAD
            {!this.props.user ? <Link to="/loginSignup">Login/Signup</Link> : <div/>}
=======
            {this.props.user === null ? (
              <Link to="/loginSignup">Login/Signup</Link>
            ) : null}
>>>>>>> a8f7d07d24759f1c9ac7edbafe392fd4a3f49138
          </div>

          <div className="circular">
            <img
              className="home-image"
              src="../../images/home-image.jpg"
              alt="welcome"
            />
          </div>
        </div>
      </div>
    );
  }
}
