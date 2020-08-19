import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAILURE,
} from '../actions/index';

const INITIAL_STATE = {
  isFetching: false,
  token: '',
  error: '',
};

const getToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isFetching: false,
      };
    case RECEIVE_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default getToken;
