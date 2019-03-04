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
      <div className="container">
        halllllooooo
        <div className="row justify-content-md-center">
          picture:
          <Img src={this.props.user.image} alt="profile" />
        </div>
        <div>
          Name: {this.props.user.name}
        </div>
        <div>
          About: {this.props.user.about}
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
    );
  }
}

export default Profile