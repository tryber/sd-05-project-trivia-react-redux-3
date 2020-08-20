import { combineReducers } from 'redux';
import getToken from './TokenReducer';
import loginReducer from './LoginReducer';
import questionsReducer from './QuestionsReducer';

const rootReducer = combineReducers({
  getToken,
  loginReducer,
  questionsReducer,
});

export default rootReducer;
