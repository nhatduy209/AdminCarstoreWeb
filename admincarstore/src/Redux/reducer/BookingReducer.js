import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';
import PostService from '../../Service/PostService';
import {toast} from 'react-toastify';

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
  return response.data;
});

export const confirmBooking = createAsyncThunk('meetings/confirm', async data => {
  var postAPI = new PostService();
  const params = {
    id_meeting: data.id_meeting,
    clients_email: data.clients_email,
  };
  const response = await postAPI.PostAPI(APP_URL.CONFIRM_BOOKING, params);
  return response.data;
});
export const cancelBooking = createAsyncThunk('meetings/cancel', async data => {
  var postAPI = new PostService();
    const params = {
      id_meeting: data.id_meeting,
      email: data.email,
    };
    const response = await postAPI.PostAPI(APP_URL.CANCEL_BOOKING, params);
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
      if (action.payload.result === STATUS.SUCCESS) {
        state.listBooking = action.payload.data;
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(confirmBooking.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.result === STATUS.SUCCESS) {
        toast.success('Confirm booking successfully');
        state.confirmStatus = STATUS.SUCCESS;
      } else {
        toast.success('Confirm booking successfully');
        state.confirmStatus = STATUS.FAIL;
      }
    });
    builder.addCase(cancelBooking.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.result === STATUS.SUCCESS) {
        toast.success('Cancel booking successfully');
        state.cancelStatus = STATUS.SUCCESS;
      } else {
        toast.success('Cancel booking successfully');
        state.cancelStatus = STATUS.FAIL;
      }
    });
  },
});

export const getDetailMeeting = (state, id) => state.BookingReducer.listBooking.filter((el) => el.id_meeting === id);

export default bookingReducer.reducer;
