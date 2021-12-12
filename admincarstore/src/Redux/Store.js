import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './reducer/RootReducer';
export const store = configureStore({
  reducer: RootReducer,
});
