import {combineReducers} from 'redux';
import accountReducer from './AccountReducer';

export default combineReducers({
  AccountReducer: accountReducer,
});
