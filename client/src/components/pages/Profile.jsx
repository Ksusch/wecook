import React, { Component } from "react";
import UploadWidget from "../UploadWidget";
import { ApiService } from "../../api/api";
import { Container } from 'reactstrap';
import Img from 'react-image'
// import '../styles.scss';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      about: null
    }
    this.ApiService = new ApiService()
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleImage(url) {
    console.log("url received", url)
    this.ApiService.updateUser({
      image: url
    }).then(user => this.props.handler(user))
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.name !== null || this.state.about !== null) {
      this.ApiService.updateUser(this.state)
        .then(user => this.props.handler(user))
    }
  }
  render() {
    console.log(this.props.user)
    return (
      <div className="container mt-sm-1 mb-5">
        <div className="row justify-content-md-center">
          <div className="col-lg-4 pb-md-1 pl-5">
            <Img src={this.props.user.image} alt="profile" />
          </div>
          <div className="col-lg ml-lg-5 pr-lg-5 text-lg-left text-center">
            <h3>Welcome {this.props.user.name}</h3>
            <p>About: {this.props.user.about}</p>
          </div>
          <UploadWidget
            imageType="profilePic"
            handler={url => this.handleImage(url)}
            class="upload-widget"
          />
          <form onSubmit={(e) => this.handleSubmit(e)}>
            Name: <input type="text" name="name" onChange={(e) => this.handleChange(e)} />
            About: <input type="textarea" name="about" onChange={(e) => this.handleChange(e)} />
            <button type="submit">Submit me!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile