/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  year: '',
  month: '',
  day: '',
  gender: '',
  cert: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
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

export const { userInfo, certInfo } = userSlice.actions;
export default userSlice;