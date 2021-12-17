import {combineReducers} from 'redux';
import accountReducer from './AccountReducer';
import carReducer from './CarReducer';

export default combineReducers({
  AccountReducer: accountReducer,
  CarReducer: carReducer,
});
