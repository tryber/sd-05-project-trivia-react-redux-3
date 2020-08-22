import {
  USER_SCORE,
  NEW_SCORE,
} from '../actions/index';

const INITIAL_STATE = {
  score: 0,
};

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SCORE:
      return {
        ...state,
        score: state.score + parseInt(action.score, 0),
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

export default scoreReducer;
