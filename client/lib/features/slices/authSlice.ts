import { isBrowser } from "@/lib/utils";
import { AuthState } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
   token: isBrowser ? localStorage.getItem("authToken") : null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCredentials: (state, action: PayloadAction<{ token: string }>) => {
         state.token = action.payload.token;
         if (isBrowser) {
            localStorage.setItem("authToken", action.payload.token);
         }
      },
      logout: state => {
         state.token = null;
         if (isBrowser) {
            localStorage.removeItem("authToken");
         }
      },
   },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
