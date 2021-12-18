import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';

const initialState = {
  listBooking: [],
  status: 'FAIL',
};

// First, create the thunk
export const getBooking = createAsyncThunk('meetings/getmeetings', async email => {
  const params = {
    email
  };
  var getService = new GetService();
  const response = await getService.getApiWithParam(APP_URL.GET_MEETINGS, params);
  console.log(response);
  return response.data;
});

export const bookingReducer = createSlice({
  name: 'bookingReducer',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getBooking.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.result === STATUS.SUCCESS) {
        state.listBooking = action.payload.data;
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
  },
});

export const getCurrentUser = state => state.AccountReducer.account;

export default bookingReducer.reducer;
