import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isShowProfile: false,
};

export const globalReducer = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    showProfile: (state, isShow) => {
      console.log(isShow.payload);
      state.isShowProfile = isShow.payload;
    }
  },
});

export const {showProfile} = globalReducer.actions;

export const isShowProfile = state => state.GlobalReducer.isShowProfile;

export default globalReducer.reducer;
