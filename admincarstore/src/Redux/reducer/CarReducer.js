import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';

const initialState = {
  listCar: [],
  status: false
};

// First, create the thunk
export const getcar = createAsyncThunk('car', async () => {
  var getService = new GetService();
  const response = await getService.getAPI(APP_URL.GET_LIST_CAR);
  console.log(response);
  return response.data;
});

export const carReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeName: state => {
      state.account.email = 'change@gmail.com';
    },
  },
  extraReducers: builder => {
    builder.addCase(getcar.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.result === STATUS.SUCCESS) {
        state.listCar = action.payload.data;
        state.status = action.payload.result;
      } else {
        console.log(action);
        state.status = action.payload.result;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeName} = carReducer.actions;

export const getListCar = state => state.CarReducer.listCar;

export default carReducer.reducer;
