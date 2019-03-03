import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import '../styles.scss';
import api from '../api/api'

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
						{this.props.user !== null && <NavLink to="/logout">Logout</NavLink>}
					</NavItem>
				</Nav>
			</div>
		)
	}
}
