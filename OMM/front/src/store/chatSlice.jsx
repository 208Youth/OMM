/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberId: '',
};
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatInfo: (state, action) => {
      state.memberId = action.payload;
    },
  },
});

// reducer 사용시 import { userInfo } from '../../store/userSlice'; 이렇게 사용

export const { chatInfo } = chatSlice.actions;
export default chatSlice;
