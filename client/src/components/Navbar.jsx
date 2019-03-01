import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import '../styles.scss';
import api from '../api'

export default class Navbar extends Component {
	render() {
		return (
			<div>
				<Nav>
					<NavItem>
						<NavLink to="/" exact>Home</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/">Pet a pet</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/">Offer pet</NavLink>
					</NavItem>
					<NavItem>
						{!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
						{!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
						{api.isLoggedIn() && <Link to="/" onClick={api.logout}>Logout</Link>}
					</NavItem>
				</Nav>
			</div>
		)
	}
}
