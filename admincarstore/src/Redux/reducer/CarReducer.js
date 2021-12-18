import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';

const initialState = {
  listCar: ['HELLo'],
  status: false,
};

// First, create the thunk
export const getCar = createAsyncThunk('car/getlist', async () => {
  var getService = new GetService();
  const response = await getService.getAPI(APP_URL.GET_LIST_CAR);
  console.log(response);
  return response.data;
});

export const carReducer = createSlice({
  name: 'carReducer',
  initialState,
  reducers: {
    changeName: state => {
      state.account.email = 'change@gmail.com';
    },
  },
  extraReducers: builder => {
    builder.addCase(getCar.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      state.listCar = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeName} = carReducer.actions;

export const getListCar = state => {
  console.log('state -', state);
  return state.CarReducer.listCar;
};

export default carReducer.reducer;
