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

export const { chatInfo } = chatSlice.actions;
export default chatSlice;
