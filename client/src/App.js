import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Signup</NavLink>
          </NavItem>
        </Nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
