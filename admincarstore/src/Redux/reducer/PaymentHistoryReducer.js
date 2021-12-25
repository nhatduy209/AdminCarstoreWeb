import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { STATUS } from '../../Config/Status/Index';
import { APP_URL } from '../../Config/Url/URL';
import GetService from '../../Service/GetService';
import PostService from '../../Service/PostService';
import {toast} from 'react-toastify';

const initialState = {
  paymentList: [],
  bills: [],
  status: 'FAIL',
};

export const createPayment = createAsyncThunk('payment/create', async data => {
  var postService = new PostService();
  const params = {
    client: data.client,
    car: data.car,
    admin: data.admin,
    id_meeting: data.id_meeting,
  };
  console.log(params);
  const response = await postService.PostAPI(APP_URL.CREATE_PAYMENT, params);
  console.log(response);
  return response;
});

export const getBills = createAsyncThunk('payment/getStatistic', async () => {
  var getService = new GetService();
  const response = await getService.getAPI(APP_URL.GET_BILLS);
  console.log(response);
  return response;
});

export const paymentHistoryReducer = createSlice({
  name: 'paymentHistoryReducer',
  initialState,
  reducers: {
    changePaymentStatus: state => {
      state.status = STATUS.FAIL;
    },
    getListBills: state => {
      return state.bills;
    }
  },
  extraReducers: builder => {
    builder.addCase(createPayment.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        toast.success('Create bill successfully');
        state.status = STATUS.SUCCESS;
      } else {
        toast.success('Create bill fail');
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(getBills.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.bills = action.payload.data.data;
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
  },
});

export const {getListBills, changePaymentStatus} = paymentHistoryReducer.actions;

export default paymentHistoryReducer.reducer;
