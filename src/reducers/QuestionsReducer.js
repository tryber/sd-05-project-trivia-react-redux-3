import { RECEIVE_QUESTIONS, UPDATE_SCORE } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  score: 0,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.score,
      }
    default:
      return state;
  }
};

export default questionsReducer;
