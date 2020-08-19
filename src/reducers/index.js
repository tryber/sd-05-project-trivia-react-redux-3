import { combineReducers } from 'redux';
import getToken from './TokenReducer';
import loginReducer from './LoginReducer';

const rootReducer = combineReducers({
  getToken,
  loginReducer,
});

export default rootReducer;
