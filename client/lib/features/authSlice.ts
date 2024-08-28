import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const authSlice = createSlice({
   name: "auth",
   initialState: { token: "" },
   reducers: {
      setCredentials: (state, action: { payload: { accessToken: string }; type: string }) => {
         const { accessToken } = action.payload;
         state.token = accessToken;
      },
      logOut: (state, action) => {
         state.token = "";
      },
   },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
