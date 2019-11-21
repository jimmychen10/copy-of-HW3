import React from 'react';
import { connect } from 'react-redux';

const Home = ({ email }) => {
  return (
    <div>
      <h2>Home</h2>
      {/* <div>Welcome {email}</div> */}
    </div>
  );
};

export default connect(state => ({
  email: state.userReducer.email,
}))(Home);