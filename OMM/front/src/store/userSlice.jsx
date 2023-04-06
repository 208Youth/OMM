/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: '',
  height: '',
  lat: '',
  lng: '',
  highschool: '',
  military: '',
  my_drinking_style: '',
  my_smoking_style: '',
  my_contact_style: '',
  age_min: '',
  age_max: '',
  height_min: '',
  height_max: '',
  range_min: '',
  range_max: '',
  drinking_style: '',
  smoking_style: '',
  contact_style: '',
  MBTI: '',
  pet: '',
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
      state.military = action.payload.military;
      console.log(state.military);
    },
    moreInfo2: (state, action) => {
      state.my_contact_style = action.payload.my_contact_style;
      state.my_drinking_style = action.payload.my_drinking_style;
      state.my_smoking_style = action.payload.my_smoking_style;
    },
    moreInfo3: (state, action) => {
      state.age_min = action.payload.age_min;
      state.age_max = action.payload.age_max;
      state.height_min = action.payload.height_min;
      state.height_max = action.payload.height_max;
      state.range_min = action.payload.range_min;
      state.range_max = action.payload.range_max;
    },
    moreInfo4: (state, action) => {
      state.drinking_style = action.payload.drinking_style;
      state.smoking_style = action.payload.smoking_style;
      state.contact_style = action.payload.contact_style;
    },
    moreInfo5: (state, action) => {
      state.MBTI = action.payload.MBTI;
      state.pet = action.payload.pet;
    },
  },
});

// reducer 사용시 import { userInfo } from '../../store/userSlice'; 이렇게 사용

export const { moreInfo1, moreInfo2, moreInfo3, moreInfo4, moreInfo5 } = userSlice.actions;
export default userSlice;
