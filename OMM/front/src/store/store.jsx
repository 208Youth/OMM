import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { PERSIST, REGISTER, persistReducer } from 'redux-persist';

import userSlice from './userSlice';
import chatSlice from './chatSlice';
import recSlice from './recSlice';

// useSelector 사용시  const ... = useSelector(state => state.user); 이렇게 호출

const reducers = combineReducers({
  user: userSlice.reducer,
  chat: chatSlice.reducer,
  rec: recSlice.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'chat', 'rec'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, PERSIST],
      },
    }),
});

export default store;
