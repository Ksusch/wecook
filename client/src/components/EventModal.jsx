import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import "../styles.scss";
import UploadWidget from "./UploadWidget";

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoibWMxMDBzIiwiYSI6ImNqb2E2ZTF3ODBxa3czd2xldHp1Z2FxbGYifQ.U4oatm5RsTXXHQLz5w66dQ"
});

export default class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      description: "",
      location: "",
      image: "",
      searchResults: [],
      coordinates: []
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    if (this.props.event) {
      this.setState({
        image: this.props.event.image,
        name: this.props.event.name,
        description: this.props.event.description,
        location: this.props.event.location
      });
    }
  }
  toggle() {
    this.props.toggleModal();
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name === "location") {
      geocodingClient
        .forwardGeocode({
          query: e.target.value
        })
        .send()
        .then(response => {
          this.setState({
            searchResults: response.body.features
          });
        });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.name &&
      this.state.name.length > 0 &&
      this.state.location &&
      this.state.location.length > 0 &&
      this.state.coordinates &&
      this.state.coordinates.length > 0 &&
      this.state.description &&
      this.state.description.length > 0
    ) {
      let event = {
        name: this.state.name,
        location: this.state.location,
        coordinates: this.state.coordinates,
        description: this.state.description,
        image: this.state.image
      };
      this.props.handler(event);
      this.toggle();
    }
  }
  handleImage(url) {
    this.setState({ image: url });
  }
  handleSearchResultClick(result) {
    console.log(result);
    this.setState({
      location: result.place_name,
      coordinates: result.center,
      searchResults: []
    });
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add an Event</ModalHeader>
          <ModalBody>
            <UploadWidget
              handler={url => this.handleImage(url)}
              imageType="eventPic"
            />
            <div className="modal-camera-padding" />
            <Form onSubmit={e => this.handleSubmit(e)}>
              <FormGroup>
                <Input
                  placeholder={
                    this.props.event.name === undefined
                      ? "Event name"
                      : this.props.event.name
                  }
                  value={this.state.name}
                  name="name"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder={
                    this.props.event.location === undefined
                      ? "Location"
                      : this.props.event.location
                  }
                  value={this.state.location}
                  name="location"
                  onChange={e => this.handleChange(e)}
                />
                {this.state.searchResults.map(result => (
                  <div onClick={() => this.handleSearchResultClick(result)}>
                    {result.place_name}
                    <hr />
                  </div>
                ))}
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="description"
                  placeholder={
                    this.props.event.description === undefined
                      ? "Description"
                      : this.props.event.description
                  }
                  value={this.state.description}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <FormGroup>
              <Button className="btn btn-primary" type="submit">
                <i className="fas fa-save" />
              </Button>
            </FormGroup>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
