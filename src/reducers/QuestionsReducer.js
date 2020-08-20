import { RECEIVE_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
}

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
};

export default questionsReducer;
