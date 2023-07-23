import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { listCategorySlice } from './listCategorySlice.ts';
import { userSlice } from './userSlice.ts';
import { locationSlice } from './locationSlice.ts';

const reducers = combineReducers({
  category: listCategorySlice.reducer,
  user: userSlice.reducer,
  location: locationSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'location'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
