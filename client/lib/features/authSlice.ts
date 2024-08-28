"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface AuthState {
   patientToken: string;
   doctorToken: string;
   adminToken: string;
}

const persistedAuthState: AuthState =
   typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth") || "{}") : {};
   
const initialState: AuthState = {
   patientToken: persistedAuthState.patientToken || "",
   doctorToken: persistedAuthState.doctorToken || "",
   adminToken: persistedAuthState.adminToken || "",
};

interface SetCredentialsPayload {
   accessToken: string;
   type: "patient" | "admin" | "doctor";
}

interface LogOutPayload {
   type: "patient" | "admin" | "doctor";
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
         const { accessToken, type } = action.payload;
         if (type === "patient") {
            state.patientToken = accessToken;
         } else if (type === "doctor") {
            state.doctorToken = accessToken;
         } else if (type === "admin") {
            state.adminToken = accessToken;
         }
         if (typeof window !== "undefined") {
            localStorage.setItem("auth", JSON.stringify(state));
         }
      },
      logOut: (state, action: PayloadAction<LogOutPayload>) => {
         const { type } = action.payload;
         if (type === "patient") {
            state.patientToken = "";
         } else if (type === "doctor") {
            state.doctorToken = "";
         } else if (type === "admin") {
            state.adminToken = "";
         }
         if (typeof window !== "undefined") {
            localStorage.setItem("auth", JSON.stringify(state));
         }
      },
   },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectPatientToken = (state: RootState) => state.auth.patientToken;
export const selectAdminToken = (state: RootState) => state.auth.adminToken;
export const selectDoctorToken = (state: RootState) => state.auth.doctorToken;

export default authSlice.reducer;
