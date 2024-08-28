import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/authSlice";
export const makeStore = () => {
   return configureStore({
      reducer: {
         auth: authSlice,
      },
      devTools: process.env.NEXT_PUBLIC_ENV !== "production",
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
