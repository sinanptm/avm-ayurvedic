import { configureStore } from '@reduxjs/toolkit';
import products from './features/products/productsSlice';

export const store = configureStore({
  reducer: {
    products
  },
});
