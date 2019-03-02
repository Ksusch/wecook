import React, { Component } from 'react';
import '../styles.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
