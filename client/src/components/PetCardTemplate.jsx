import React, { Component } from 'react';
//TODO: Restyle the component and make it into a generic component ready to receive content from an external component through props.
export default class PetCard extends Component {
  render() {
    return (
      <div className="pet-card d-flex flex-nowrap justify-content-between">
        <div>
          <div className="pet-image-wrapper">
            <img src={this.props.pet.image} alt="this pet" />
          </div>
        </div>
        <div>
          <ul className="pet-details">
            <li>Name: {this.props.pet.name}</li>
            <li>
              Animal: {this.props.pet.animal}{' '}
              <i className={`fas fa-${this.props.pet.animal}`} />
            </li>
          </ul>
          <div className="pet-description">{this.props.pet.description}</div>
        </div>
      </div>
    );
  }
}
