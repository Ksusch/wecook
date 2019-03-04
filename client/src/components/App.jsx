import React, { Component } from 'react';
import { Container } from 'reactstrap';
import '../styles.scss';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthService, StorageService } from '../api/api';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		};
		this.AuthService = new AuthService();
		this.StorageService = new StorageService();
		this.handleLogout = this.handleLogout.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
	}

	componentDidMount() {
		// check if a user exists and storage
		let user = this.StorageService.get("user");
		if (user !== null) {
			this.AuthService.verify(user).then(res => {
				if (res.status === 200) {
					this.setState({
						user: user,
					});
				} else {
					this.StorageService.remove("user")
				}
			});
		} 
	}
	handleLogin(user) {		
		console.log("handleLogin fired on app")
		this.StorageService.set("user", user);
		this.setState({
			user: user
		});
	}
	handleLogout() {
		console.log("handleLogout fired", this.state.user)
		this.setState({
			user: null
		});
		console.log("after set state", this.state.user)
		this.StorageService.remove("user")
	}

	handleConfirm(token) {
		this.AuthService.confirmEmail(token)
		.then(user => this.setState({
			user: user
		})).then(console.log(this.state.user))
		
		.catch(err => console.error(err))
	}

	render() {
		return (
			<Container className="App">
			<Navbar user={this.state.user}/>
				{/* {this.state.user !== null ? <Navbar user={this.state.user}/> : <div/>}  */}
				<Switch>
					<Route
						exact path="/"
						render={props => <Home {...props} user={this.state.user} />}
					/>
					<Route
						path="/profile"
						render={props => (
							<Profile {...props} user={this.state.user} />
						)}
					/>
					<Route
						path="/loginSignup"
						render={props => (
							this.state.user === null ?
								<LoginSignup
									{...props}
									handler={user => this.handleLogin(user)}
								/>
								:
								<Redirect to="/"/>
						)}
					/>
					<Route path="/confirm/:confirmationToken" render={(props) => {
						this.handleConfirm(props.match.params.confirmationToken)
						return (<Redirect to="/"/>)
					}}/>
					<Route path="/logout" render={() => {
						this.handleLogout()
						return (
							<Redirect to="/"/>
						)}}/>
				</Switch>
			</Container>
		);
	}
}

export default App;
