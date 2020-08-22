import { getTriviaToken, getTriviaQuestions, getProfilePicture } from '../services/Api';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';
export const LOGIN_USER = 'LOGIN_USER';
export const USER_PICTURE = 'USER_PICTURE';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

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

const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
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

const userPicture = (src) => ({
  type: USER_PICTURE,
  src,
});

function fetchImage(email) {
  return (dispatch) => {
    getProfilePicture(email)
      .then(
        (src) => dispatch(userPicture(src)),
      );
  };
}

const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

function fetchQuestions(token) {
  return (dispatch) => {
    getTriviaQuestions(token)
      .then(
        (questions) => dispatch(receiveQuestions(questions)),
      );
  };
}

export {
  fetchToken,
  loginUser,
  fetchImage,
  fetchQuestions,
  updateScore,
};
