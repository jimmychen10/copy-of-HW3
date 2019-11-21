import axios from 'axios'

export const setUsername = username => ({ // 1 param = no parentheses
  type: 'SET_USERNAME',
  username,
});

export const setPassword = password => ({ // 1 param = no parentheses
  type: 'SET_PASSWORD',
  password,
});

export const registerUser = () => (dispatch, getState) => {
  const {username, password} = getState().userReducer;

  // update the note, clear the textfield, update the list of notes/text on the page.
  axios.post(`/register?username=${username}&password=${password}`)
    .then(() => {
      dispatch(setUsername(''));
      dispatch(setPassword(''));
    })
    .catch(console.log);
    //.then((res) => console.log('Registered'))
    //.catch(console.log);
};

export const setIsLoggedIn = isLoggedIn => ({
  type: 'SET_IS_LOGGED_IN',
  isLoggedIn,
});