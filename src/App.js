import React from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Notes from './pages/Notes';
import { connect } from 'react-redux';

// if logged in, you dont see the login page and you see notes page
// conversely, if not logged in, you dont get to see notes page.
const App = ({ isLoggedIn }) => {
  return (
    <div className="App-header">
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
        </div>
        {!isLoggedIn && (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
        {isLoggedIn && (
          <div>
            <Link to="/notes">Notes</Link>
          </div>
        )}
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/notes" component={Notes} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.userReducer.users,
  password: state.userReducer.password,
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);
