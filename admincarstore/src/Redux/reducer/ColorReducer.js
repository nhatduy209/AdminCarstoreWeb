import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listColor: [],
  status: 'FAIL',
};

export const colorReducer = createSlice({
  name: 'corlorReducer',
  initialState,
  reducers: {
    addColor: (state, color) => {
      state.listColor.push(color.payload);
    },
    setDefault: state => {
      state.listColor = [];
    },
    setColor: (state, listColor) => {
      state.listColor = listColor.payload;
    }
  },
});

export const {addColor, setDefault, setColor} = colorReducer.actions;

export const getListColor = state => state.ColorReducer.listColor;

export default colorReducer.reducer;
