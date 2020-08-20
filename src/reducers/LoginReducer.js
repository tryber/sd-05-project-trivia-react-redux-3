import {
  LOGIN_USER,
  USER_PICTURE,
} from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
    user: '',
  },
  src: '',
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
    default:
      return state;
  }
};

export default loginReducer;
