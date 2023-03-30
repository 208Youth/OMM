/* eslint-disable */

import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    name: '',
    year: '',
    month: '',
    day: '',
    gender: '',
    cert: [],
  },
  reducers: {
    userInfo: (state, action) => {
      state.name = action.payload.name;
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.day = action.payload.day;
      state.gender = action.payload.gender;
    },
    certInfo: (state, action) => {
      const certList = state.cert;
      state.cert = [...certList, action.payload]
      console.log(action.payload);
      console.log(state.cert);
    }
  },
});

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    certInfo: userSlice.reducer,
  },
});

export default store;
export const { userInfo, certInfo } = userSlice.actions;
