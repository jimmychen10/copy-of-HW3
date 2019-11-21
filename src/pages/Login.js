import React from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUsername, setPassword, registerUser } from '../redux/actions/userActions';

const Login = ({ dispatch, username, password, isLoggedIn }) => {
  // const [username, setUsername] = React.useState('')
  // const [password, setPassword] = React.useState('')
  // React.useEffect(() => {
  //   axios.get('/service1/')
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch(console.log);
  // }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY

  const validate = () => {
    const body = {
      username,
      password: md5(password),
    };
    axios.post('/service2/*', body)
      .then((res) => {
        if (res.data.valid) {
          document.cookie = `username=${username}`; //set cookies with key/value pairs
          document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs 
        }
      })
      .catch(console.log);
  }

  const updateUsername = (newUsername) => { // this just updates a redux state?
    if (newUsername.length < 20) {
      dispatch(setUsername(newUsername));
    }
  };

  // updates the redux state of password back to ''
  const updatePassword = (newPassword) => { // this just updates a redux state?
    if (newPassword.length < 20) {
      dispatch(setPassword(newPassword));
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <div>
        Username:
          <input
            value={username}
            onChange={e => updateUsername(e.target.value)}
          />
          <hr />
          Password:
          <input
            value={password}
            onChange={e => updatePassword(e.target.value)}
          />
          <hr />
        </div>
        <div>
          <button onClick={validate}>
            Submit
          </button>
        </div> 
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  password: state.userReducer.password,
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);
