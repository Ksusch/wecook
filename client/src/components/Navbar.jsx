import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<div>
				<Nav>
					<NavItem>
						<NavLink to="/" exact>Disabled Link</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/">Pet a pet</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/">Offer pet</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/">Login/Signup </NavLink>
					</NavItem>
				</Nav>
			</div>
		)
	}
}
