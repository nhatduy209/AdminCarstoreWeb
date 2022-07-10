import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS, GET_LIST_USER_STATUS} from '../../Config/Status/Index';
import PostService from '../../Service/PostService';
import GetService from '../../Service/GetService';
import DeleteService from '../../Service/DeleteService';
import {token_authen} from '../../Config/Status/Key';
import {toast} from 'react-toastify';
import {uploadImageToStorage} from '../../common/PushImage';

const initialState = {
  account: {
    address: '',
    image: '',
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
  listAcc: {
    status: GET_LIST_USER_STATUS.NONE,
    listUser: [],
  },
  status: false,
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

// First, create the thunk
export const changeProfile = createAsyncThunk(
  'account/changeinfo',
  async data => {
    if (data.img) {
      const newList = await uploadImageToStorage(data.url, data.img);
      data.avatar = newList;
    }

    const postService = new PostService();
    const params = {
      name: data.name,
      image: data.avatar,
      email: data.email,
      phone: data.phoneNum,
      address: data.address,
      password: data.password,
      gender: data.gender,
      birthday: data.date,
    };
    var response = await postService.PostAPI(APP_URL.CHANGE_INFO, params);
    return response.data;
  },
);

// First, create the thunk
export const deleteUser = createAsyncThunk('account/delete', async email => {
  const params = {
    email: email.email,
  };
  var delService = new DeleteService();
  const response = await delService.DeleteAPI(APP_URL.DELETE_USER, params);
  console.log('response delete ---' + JSON.stringify(response.data));
  return response.data;
});

export const getAllUser = createAsyncThunk('account/getUser', async () => {
  var getService = new GetService();
  const response = await getService.getAPI(APP_URL.GET_LIST_USER);
  return response.data;
});

export const accountReducer = createSlice({
  name: 'accountReducer',
  initialState,
  reducers: {
    changeName: state => {
      state.account.email = 'change@gmail.com';
    },
    setLoginState: (state, isLogin) => {
      state.account.isLoggin = isLogin;
    },
    updateProfile: (state, data) => {
      state.account = data.payload;
    },
    changeAccountStatus: state => {
      state.status = false;
    },
    clearAccountInfo: state => {
      state.account = {
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
      };
    },
    deleteUserRedux: (state, action) => {
      state.listAcc.listUser = state.listAcc.listUser.filter(
        item => item.email !== action.payload,
      );
    },
    filterUser: (state, action) => {
      if (action.payload) {
        state.listAcc.listUser = state.listAcc.listUser.filter(item =>
          item.name.includes(action.payload),
        );
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      // Add user to the state array

      //  console.log('state account ---' + JSON.stringify(action.payload.data));
      if (action.payload.result === STATUS.SUCCESS) {
        state.account = action.payload.data;
        state.account.isLoggin = STATUS.SUCCESS;
        localStorage.setItem(token_authen, action.payload.data.token);
        localStorage.setItem('email', action.payload.data.email);
        localStorage.setItem('password', action.payload.data.password);
      } else {
        state.account.isLoggin = STATUS.FAIL;
      }
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('state ---' + JSON.stringify(state));

      console.log('payload ---' + JSON.stringify(action.payload.data));
      if (action.payload.result === STATUS.SUCCESS) {
        state.listAcc.listUser = action.payload.data;
        state.listAcc.status = GET_LIST_USER_STATUS.SUCCESS;
      } else {
        return state.AccountReducer?.listAcc;
      }
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.result === STATUS.SUCCESS) {
        toast.success('Delete user successfully');
      } else {
        toast.error('Delete user error');
      }
    });

    builder.addCase(changeProfile.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.result === STATUS.SUCCESS) {
        state.status = true;
        toast.success('Update profile successfully');
      } else {
        toast.error('Update profile error');
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  changeName,
  deleteUserRedux,
  filterUser,
  clearAccountInfo,
  changeAccountStatus,
  updateProfile,
  setLoginState,
} = accountReducer.actions;

export const getCurrentUser = state => state.AccountReducer.account;

export const getListUser = state => state.AccountReducer.listAcc;

export default accountReducer.reducer;
