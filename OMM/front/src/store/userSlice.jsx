/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  year: '',
  month: '',
  day: '',
  gender: '',
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
  },
});

// reducer 사용시 import { userInfo } from '../../store/userSlice'; 이렇게 사용

export const { userInfo } = userSlice.actions;
export default userSlice;
