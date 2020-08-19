import { getTriviaToken } from '../services/Api';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';
export const LOGIN_USER = 'LOGIN_USER';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const receiveTokenSuccess = (token) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token,
});

const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  error,
});

const loginUser = ({ name, email }) => ({
  type: LOGIN_USER,
  payload: { name, email },
});

function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());

    return getTriviaToken()
      .then(
        (token) => dispatch(receiveTokenSuccess(token)),
        (error) => dispatch(receiveTokenFailure(error.message)),
      );
  };
}

export {
  fetchToken,
  loginUser,
}
