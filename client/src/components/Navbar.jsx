import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "../styles.scss";

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">WEPET</NavbarBrand>
					{/* <NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar> */}
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink to="/">Find my pet a company</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/">Look for pets</NavLink>
						</NavItem>
						{this.props.user ? (
							<NavItem>
								<NavLink to="/profile">Profile</NavLink>
							</NavItem>
						) : (
								<div />
							)}
						{this.props.user ? (
							<NavItem>
								<NavLink to="/logout">Logout</NavLink>
							</NavItem>
						) : (
								<div />
							)}
					</Nav>
				</Navbar>
			</div>
		);
	}
}
