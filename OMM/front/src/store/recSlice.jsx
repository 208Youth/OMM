/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};
const recSlice = createSlice({
  name: 'rec',
  initialState,
  reducers: {
    lists: (state, action) => {
      state.list = action.payload;
    },
  },
});

// reducer 사용시 import { userInfo } from '../../store/userSlice'; 이렇게 사용

export const { lists } = recSlice.actions;
export default recSlice;
