import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { STATUS } from '../../Config/Status/Index';
import { APP_URL } from '../../Config/Url/URL';
import PostService from '../../Service/PostService';

const initialState = {
  paymentList: [],
  status: 'FAIL',
};

export const createPayment = createAsyncThunk('payment/create', async data => {
  var postService = new PostService();
  const params = {
    client: data.client,
    car: data.car,
    admin: data.admin,
  };
  const response = await postService.PostAPI(APP_URL.CREATE_PAYMENT, params);
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
  },
  extraReducers: builder => {
    builder.addCase(createPayment.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
  },
});

// export const {addColor, setDefault} = paymentHistoryReducer.actions;

export const getListColor = state => state.PaymentHistoryReducer.listColor;

export default paymentHistoryReducer.reducer;
