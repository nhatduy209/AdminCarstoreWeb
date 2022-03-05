import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isShowProfile: false,
  isShowStore: false
};

export const globalReducer = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    showProfile: (state, isShow) => {
      state.isShowProfile = isShow.payload;
    },
    showStore: (state, isShow) => {
      state.isShowStore = isShow.payload;
    }
  },
});

export const {showProfile, showStore} = globalReducer.actions;

export const {isShowProfile, isShowStore} = state => state.GlobalReducer;

export default globalReducer.reducer;
