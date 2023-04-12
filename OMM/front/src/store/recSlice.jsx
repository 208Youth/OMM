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
    dis: (state, action) => {
      for(let i = 0; i < state.list.length; i++) {
        if(state.list[i] === action.payload) {
          state.list.splice(i, 1);
          i--;
        }
      }
    },
    likey: (state, action) => {
      for(let i = 0; i < state.list.length; i++) {
        if(state.list[i] === action.payload) {
          state.list.splice(i, 1);
          i--;
        }
      }
    },
  },
});

export const { lists, dis, likey } = recSlice.actions;
export default recSlice;
