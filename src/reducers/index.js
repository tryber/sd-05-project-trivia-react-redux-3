import { combineReducers } from 'redux';
import getToken from './TokenReducer';
import loginReducer from './LoginReducer';
import questionsReducer from './QuestionsReducer';
import scoreReducer from './ScoreReducer';

const rootReducer = combineReducers({
  getToken,
  loginReducer,
  questionsReducer,
  scoreReducer,
});

export default rootReducer;
