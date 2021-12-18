import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import PostService from '../../Service/PostService';

const initialState = {
  account: {
    address: '',
    avatar: '',
    birthday: '',
    cart: [],
    email: 'admin@gmail.com',
    gender: true,
    meetings: [],
    name: '',
    password: '',
    phone: '',
    phoneNum: ',',
    isLoggin: STATUS.NONE,
  },
  lisAcc: [],
};

// First, create the thunk
export const login = createAsyncThunk('account/login', async paramsLogin => {
  const params = {
    email: paramsLogin.email,
    password: paramsLogin.password,
    tokenDevice: 'login_web',
    role: 'admin',
  };
  var postService = new PostService();
  const response = await postService.PostAPI(APP_URL.LOGIN, params);
  return response.data;
});

export const accountReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeName: state => {
      state.account.email = 'change@gmail.com';
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action.payload);
      if (action.payload.result === STATUS.SUCCESS) {
        state.account = action.payload.data;
        state.account.isLoggin = STATUS.SUCCESS;
      } else {
        state.account.isLoggin = STATUS.FAIL;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeName} = accountReducer.actions;

export const getCurrentUser = state => state.AccountReducer.account;

export default accountReducer.reducer;
