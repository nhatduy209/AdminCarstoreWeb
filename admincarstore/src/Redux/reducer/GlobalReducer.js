import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isShowProfile: false,
  isShowStore: false,
  breadcrumb : []

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
    },
    setBreadCrumb: (state, breadcrumb) => {
      state.isShowStore = breadcrumb.payload;
    }
  },
});

export const {showProfile, showStore, setBreadCrumb} = globalReducer.actions;

export const {isShowProfile, isShowStore, breadcrumb} = state => state.GlobalReducer;

export default globalReducer.reducer;
