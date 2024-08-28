import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/authSlice";
import localStorageMiddleware from "./middlewares/localStorageMiddleware";
export const makeStore = () => {
   return configureStore({
      reducer: {
         auth: authSlice,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
      devTools: process.env.NEXT_PUBLIC_ENV !== "production",
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
