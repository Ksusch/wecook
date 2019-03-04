import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles.scss";

export default class NavBar extends Component {
	render() {
		return (
			<nav className="d-flex justify-content-between">
				<NavLink to="/" exact className="navbar-link align-self-start">
					<i className="fas fa-paw" />
				</NavLink>
				<div className="align-self-end d-flex justify-content-between">
					<NavLink to="/" exact className="navbar-link">
						<i className="fas fa-search" />
					</NavLink>
					{this.props.user ? (
						<NavLink to="/profile" exact className="navbar-link">
							<i className="fas fa-user" />
						</NavLink>
					) : (
						<div />
					)}
					{this.props.user ? (
						<NavLink to="/logout" exact className="navbar-link">
							<i className="fas fa-sign-out-alt" />
						</NavLink>
					) : (
						<div />
					)}
				</div>
			</nav>
		);
	}
}
