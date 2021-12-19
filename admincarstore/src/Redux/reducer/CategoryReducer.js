import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';

const initialState = {
  listCategory: [],
  status: 'FAIL',
};

// First, create the thunk
export const getCategory = createAsyncThunk('category/getlist', async () => {
  var getService = new GetService();
  const response = await getService.getAPI(APP_URL.GET_LIST_CATEGORY);
  console.log(response);
  return response;
});

export const categoryReducer = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.listCategory = action.payload.data.data;
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
  },
});

// export const getCurrentUser = state => state.AccountReducer.account;

export default categoryReducer.reducer;
