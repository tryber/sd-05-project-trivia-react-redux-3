import { combineReducers } from 'redux';
import getToken from './TokenReducer';

const rootReducer = combineReducers({
  getToken,
});

export default rootReducer;
