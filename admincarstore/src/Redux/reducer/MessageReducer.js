import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import PostService from '../../Service/PostService';
import GetService from '../../Service/GetService';

const initialState = {
  status: 'FAIL',
  listMessages: [],
  listConv: [],
  currentConv: null
};

// First, create the thunk
export const sendMessage = createAsyncThunk('message/sendingmessage', async (data) => {
  console.log(data);
  var postService = new PostService();

  var response = await postService.PostAPI(APP_URL.SEND_MESSAGE, data);
  console.log('res', response, data);
  return response;
});

export const getListMessage = createAsyncThunk('message/getlist', async () => {
  console.log('hello');
  var getService = new GetService();

  var response = await getService.getAPI(APP_URL.GET_ALL_MESSAGE);
  console.log('res', response);
  return response;
});

export const messageReducer = createSlice({
  name: 'messageReducer',
  initialState,
  reducers: {
    setListMessage: (state, list) => {
      console.log(list);
      state.listMessages = list;
    },
    setCurrentConv: (state, conv) => {
      state.currnentConv = conv;
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.status = STATUS.SUCCESS;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(getListMessage.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        state.listConv = action.payload.data.data;
      } else {
        state.listConv = [];
      }
    });
  },
});

// export const {} = messageReducer.actions;
export const {setListMessage, setCurrentConv} = messageReducer.actions;


// export const getCurrentUser = state => state.AccountReducer.account;

export default messageReducer.reducer;
