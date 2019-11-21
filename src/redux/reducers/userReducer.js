// Creating a reducer

// Step 1 initialize state
const INITIAL_STATE = {
  username:'',
  password:'',
  isLoggedIn: false,
};

// Step 2 create listener function
const userReducer = (state = INITIAL_STATE, action) => {
  // Step 3 create switch for action types
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case 'SET_USERNAME':
      return {
        ...state, // spread operator
        // email: state.email,
        // isLoggedIn: state.isLoggedIn,
        username: action.username
      };
      case 'SET_PASSWORD':
      return {
        ...state, // spread operator
        // email: state.email,
        // isLoggedIn: state.isLoggedIn,
        password: action.password
      };
    default:
      return state;
  }
};

// don't forget to export
export default userReducer;
