import {combineReducers} from 'redux';
import accountReducer from './AccountReducer';
import bookingReducer from './BookingReducer';
import carReducer from './CarReducer';

export default combineReducers({
  AccountReducer: accountReducer,
  CarReducer: carReducer,
  BookingReducer: bookingReducer
});
