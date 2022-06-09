import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import PostService from '../../Service/PostService';
import GetService from '../../Service/GetService';

const initialState = {
  status: 'FAIL',
  listMessages: [],
  listConv: [],
  currentConv: null,
  loading: false
};

// First, create the thunk
export const sendMessage = createAsyncThunk('message/sendingmessage', async (data) => {
  var postService = new PostService();

  var response = await postService.PostAPI(APP_URL.SEND_MESSAGE, data);
  return response;
});

export const getListMessage = createAsyncThunk('message/getlist', async () => {
  var getService = new GetService();

  var response = await getService.getAPI(APP_URL.GET_ALL_MESSAGE);
  console.log('response', response);
  return response;
});

export const messageReducer = createSlice({
  name: 'messageReducer',
  initialState,
  reducers: {
    setListMessage: (state, list) => {
      state.listMessages = list;
    },
    setCurrentConv: (state, conv) => {
      state.currentConv = conv;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.status === STATUS.SUCCESS) {
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(getListMessage.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload.status === STATUS.SUCCESS) {
        state.listConv = action.payload.data.data;
      } else {
        state.listConv = [];
      }
      state.loading = false;
    });
  },
});

// export const {} = messageReducer.actions;
export const {setListMessage, setCurrentConv, setLoading} = messageReducer.actions;


// export const getCurrentUser = state => state.AccountReducer.account;

export default messageReducer.reducer;
