import {
  LOGIN_USER,
  USER_PICTURE,
  UPDATE_SCORE,
  NEW_SCORE,
} from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
    user: '',
  },
  src: '',
  score: 0,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_PICTURE:
      return {
        ...state,
        src: action.src,
      };
    case UPDATE_SCORE:
      return {
        ...state,
        score: state.score + action.score,
      };
    case NEW_SCORE:
      return {
        ...state,
        score: 0,
      };
    default:
      return state;
  }
};

export default loginReducer;
