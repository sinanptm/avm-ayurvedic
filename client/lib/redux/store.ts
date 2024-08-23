// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/api/authApi';
import authSlice from './features/slices/authSlice'
import { stat } from 'fs';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});


export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;