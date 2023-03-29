import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    name: '',
    year: '',
    month: '',
    day: '',
    gender: '',
  },
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

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
  },
});

export default store;
export const { userInfo } = userSlice.actions;