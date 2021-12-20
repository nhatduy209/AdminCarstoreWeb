import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';
import PostService from '../../Service/PostService';

const initialState = {
  storeInfo: {
    address: "TPHCM",
    CEO: "Trần Nhất Duy",
    like: 2000,
    phone: "01241512",
    intro: "12123"
  },
  status: 'FAIL',
};

// First, create the thunk
export const getStoreInfo = createAsyncThunk('store/getinfo', async () => {
  var getService = new GetService();

    var response = await getService.getAPI(APP_URL.GET_STORE_INFO);
  console.log(response);
  return response;
});

export const editStoreInfo = createAsyncThunk('store/editinfo', async data => {
  var postService = new PostService();

  var response = await postService.PostAPI(APP_URL.EDIT_STORE_INFO, data);
  console.log(response);
  return response;
});

export const storeInfoReducer = createSlice({
  name: 'storeInfoReducer',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getStoreInfo.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.storeInfo = action.payload.data.data;
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(editStoreInfo.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.storeInfo = action.payload.data.data;
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
  },
});

// export const getCurrentUser = state => state.AccountReducer.account;

export default storeInfoReducer.reducer;
