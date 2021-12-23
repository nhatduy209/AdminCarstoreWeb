import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';
import PostService from '../../Service/PostService';
import {toast} from 'react-toastify';

const initialState = {
  storeInfo: null,
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
    changeEditStatus: state => {
      state.editStatus = false;
    }
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
        toast.success('Edit store information successfully');
        state.storeInfo = action.payload.data.data;
        state.editStatus = STATUS.SUCCESS;
      } else {
        toast.error('Edit store information fail');
        state.editStatus = STATUS.FAIL;
      }
    });
  },
});

export const {changeEditStatus} = storeInfoReducer.actions;

// export const getCurrentUser = state => state.AccountReducer.account;

export default storeInfoReducer.reducer;
