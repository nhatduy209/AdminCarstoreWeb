import {combineReducers} from 'redux';
import accountReducer from './AccountReducer';
import bookingReducer from './BookingReducer';
import carReducer from './CarReducer';
import categoryReducer from './CategoryReducer';
import colorReducer from './ColorReducer';
import globalReducer from './GlobalReducer';
import messageReducer from './MessageReducer';
import paymentHistoryReducer from './PaymentHistoryReducer';
import storeInfoReducer from './StoreInfoReducer';

export default combineReducers({
  AccountReducer: accountReducer,
  CarReducer: carReducer,
  BookingReducer: bookingReducer,
  CategoryReducer: categoryReducer,
  ColorReducer: colorReducer,
  StoreInfoReducer: storeInfoReducer,
  PaymentHistoryReducer: paymentHistoryReducer,
  GlobalReducer: globalReducer,
  MessageReducer: messageReducer
});
