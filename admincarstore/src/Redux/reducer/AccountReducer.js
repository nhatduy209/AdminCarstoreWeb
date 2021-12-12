import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import GetService from '../../Service/GetService';

const initialState = {
  account: {
    email: 'nhatduy@gmail.com',
    username: 'nhatduy209',
    password: '123',
  },
  lisAcc: [],
};

// First, create the thunk
export const fetchFakeAPI = createAsyncThunk(
  'account/fetchAccount',
  async () => {
    var getService = new GetService();
    const response = await getService.getAPI(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    return response.data;
  },
);

export const accountReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeName: state => {
      state.account.email = 'change@gmail.com';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFakeAPI.fulfilled, (state, action) => {
      console.log('ALO --', action.payload);
      // Add user to the state array
      state.lisAcc.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeName} = accountReducer.actions;

export default accountReducer.reducer;
