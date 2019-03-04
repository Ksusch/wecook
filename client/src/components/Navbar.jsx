import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
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
							<NavLink href="/">Find my pet a company</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">Look for pets</NavLink>
						</NavItem>
						{this.props.user ? (
							<NavItem>
								<NavLink href="/profile">Profile</NavLink>
							</NavItem>
						) : (
							<div />
						)}
						{this.props.user ? (
							<NavItem>
								<NavLink href="/logout">Logout</NavLink>
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
