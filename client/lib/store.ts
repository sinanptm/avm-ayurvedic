import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/api/authApi";
import authSlice from "./features/slices/authSlice";
import localStorageMiddleWare from "./middlewares/localStorageMiddleware";

export const makeStore = () => {
   return configureStore({
      reducer: {
         auth: authSlice,
         [authApi.reducerPath]: authApi.reducer,
      },
      middleware: getDefaultMiddleware =>
         getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(localStorageMiddleWare),
      devTools: process.env.NEXT_PUBLIC_ENV !== "production",
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
