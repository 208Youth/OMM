/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userSlice from './userSlice';
import chatSlice from './chatSlice';

// useSelector 사용시  const ... = useSelector(state => state.user); 이렇게 호출

const reducers = combineReducers({
  user: userSlice.reducer,
  chat: chatSlice.reducer
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'chat'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;