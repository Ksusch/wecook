import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.scss';

export default class NavBar extends Component {
	render() {
		return (
			<nav className="d-flex justify-content-between">
				<NavLink
					style={{ textDecoration: 'none' }}
					to="/"
					exact
					className="navbar-link align-self-start"
				>
					<span id="logo">WePet</span>
					<i className="fas fa-paw" />
				</NavLink>
				{this.props.user ? (
					<div className="align-self-end d-flex justify-content-around">
						<NavLink to="/search" exact className="navbar-link">
							<i className="fas fa-search" />
						</NavLink>
						<NavLink to="/profile" exact className="navbar-link">
							<i className="fas fa-user" />
						</NavLink>
						<NavLink to="/logout" exact className="navbar-link">
							<i className="fas fa-sign-out-alt" />
						</NavLink>
					</div>
				) : (
					<div />
				)}
			</nav>
		);
	}
}
