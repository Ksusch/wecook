import React, { Component } from 'react';
import '../styles.scss';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthService, StorageService, ApiService } from '../api/api';
import PetCard from './PetCard';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: JSON.parse(localStorage.getItem('user')),
			pets: null
		};
		this.AuthService = new AuthService();
		this.StorageService = new StorageService();
		this.ApiService = new ApiService();
		this.handleLogout = this.handleLogout.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.user !== null &&
      this.state.user !== null &&
      (prevState.user !== this.state.user || prevState.pets !== this.state.pets)
		) {
			this.StorageService.set('user', this.state.user);
		} else if (prevState.user !== null && this.state.user === null) {
			let user = this.StorageService.get('user');
			if (user !== null) {
				this.AuthService.verify().then(res => {
					if (res.status === 200) {
						this.setState({
							user: user
						});
					} else {
						this.StorageService.remove('user');
					}
				});
			}
		}
	}
	componentDidMount() {
		// check if a user exists and storage
		let user = this.StorageService.get('user');
		if (user !== null) {
			this.AuthService.verify().then(res => {
				if (res.status === 200) {
					this.setState({
						user: user
					});
					this.acquirePetsFromDb();
				} else {
					this.StorageService.remove('user');
				}
			});
		}
	}
	acquirePetsFromDb(res) {
		console.log('acquiring data from DB, state has been pushed up', res);
		this.ApiService.getPets().then(pets => {
			console.log('pets acquired from the DB', pets);
			this.setState({
				pets: pets.data
			});
		});
	}
	handleLogin(user) {
		let userData = user.data ? user.data : user;
		this.StorageService.set('user', userData);
		this.setState({
			user: userData
		});
		this.acquirePetsFromDb();
	}
	handleLogout() {
		this.setState({
			user: null
		});
		this.StorageService.remove('user');
	}

	handleConfirm(token) {
		this.AuthService.confirmEmail(token).then(user =>
			this.setState({
				user: user
			})
		);
	}
	render() {
		console.log('user in app state after re-render: ', this.state.user);
		return (
			<div className="App">
				<Navbar user={this.state.user} />
				<Switch>
					<Route
						exact
						path="/"
						render={props => <Home {...props} user={this.state.user} />}
					/>
					<Route
						path="/profile"
						render={props =>
							this.state.user !== null ? (
								<Profile
									{...props}
									user={this.state.user}
									pets={this.state.pets}
									handler={user => this.handleLogin(user)}
									handleUpdate={res => this.acquirePetsFromDb(res)}
								/>
							) : (
								<Redirect to="/" />
							)
						}
					/>
					<Route
						path="/loginSignup"
						render={props =>
							this.state.user === null ? (
								<LoginSignup
									{...props}
									handler={user => this.handleLogin(user)}
								/>
							) : (
								<Redirect to="/" />
							)
						}
					/>
					<Route
						path="/confirm/:confirmationToken"
						render={props => {
							this.handleConfirm(props.match.params.confirmationToken);
							return <Redirect to="/" />;
						}}
					/>
					<Route
						path="/logout"
						render={() => {
							this.handleLogout();
							return <Redirect to="/" />;
						}}
					/>
					<Route path="/petcard" render={() => <PetCard />} />
				</Switch>
			</div>
		);
	}
}

export default App;
