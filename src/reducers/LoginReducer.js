import {
  LOGIN_USER,
  USER_PICTURE,
  USER_SCORE,
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
    case USER_SCORE:
      return {
        ...state,
        score: action.score,
      }
    default:
      return state;
  }
};

export default loginReducer;
