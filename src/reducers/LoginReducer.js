import {
  LOGIN_USER,
} from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
    user: '',
  }
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
