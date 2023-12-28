import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  weatherDetailsLoader: false,
  weatherDetails: null,
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    weatherDetailsListen(state) {
      state.weatherDetailsLoader = true;
    },
    weatherDetailsSuccess(state, action) {
      state.weatherDetailsLoader = false;
      state.weatherDetails = action.payload;
    },
    weatherDetailsFaild(state) {
      state.weatherDetailsLoader = false;
    },
  },
});

export const homeActions = homeSlice.actions;

export const homeReducer = homeSlice.reducer;

export default homeReducer;
