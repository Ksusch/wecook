import React, { Component } from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles.scss';
import api from '../api/api'

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/" >WEPET</NavbarBrand>
					{/* <NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar> */}
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="/">Find my pet a company</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">Look for pets</NavLink>
						</NavItem>
						<NavItem>
							{!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
							{!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
							{api.isLoggedIn() && <Link to="/" onClick={api.logout}>Logout</Link>}
						</NavItem>

					</Nav>
				</Navbar>
			</div>
		);
	}
}