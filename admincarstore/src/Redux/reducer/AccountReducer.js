import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS, GET_LIST_USER_STATUS} from '../../Config/Status/Index';
import PostService from '../../Service/PostService';
import GetService from '../../Service/GetService';
import {token_authen} from '../../Config/Status/Key';
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
  lisAcc: {
    status: GET_LIST_USER_STATUS.NONE,
    listUser: [],
  },
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

export const getAllUser = createAsyncThunk('account/getUser', async () => {
  var getService = new GetService();
  const response = await getService.getAPI(APP_URL.GET_LIST_USER);
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
      if (action.payload.result === STATUS.SUCCESS) {
        state.account = action.payload.data;
        state.account.isLoggin = STATUS.SUCCESS;
        localStorage.setItem(token_authen, action.payload.data.token);
      } else {
        state.account.isLoggin = STATUS.FAIL;
      }
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.result === STATUS.SUCCESS) {
        state.lisAcc.listUser = action.payload.data;
        state.lisAcc.status = GET_LIST_USER_STATUS.SUCCESS;
        console.log('ACTION GET USER -', state.lisAcc.listUser);
      } else {
        state.lisAcc.status = GET_LIST_USER_STATUS.FAIL;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeName} = accountReducer.actions;

export const getCurrentUser = state => state.AccountReducer.account;

export const getListUser = state => state.AccountReducer.lisAcc;

export default accountReducer.reducer;
