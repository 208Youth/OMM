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
    moreInfo1: (state, action) => {
      state.nickname = action.payload.nickname;
      state.height = action.payload.height;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.highschool = action.payload.highschool;
      state.contact_style = action.payload.contact_style;
    },
    moreInfo2: (state, action) => {
      state.drinking_style = action.payload.drinking_style;
      state.height = action.payload.height;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.highschool = action.payload.highschool;
      state.contact_style = action.payload.contact_style;
    },
  },
});

// reducer 사용시 import { userInfo } from '../../store/userSlice'; 이렇게 사용

export const { userInfo } = userSlice.actions;
export default userSlice;
