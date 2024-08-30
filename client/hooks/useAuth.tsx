
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthState = JSON.parse(localStorage.getItem("auth") || "{}");
      setAuthState(storedAuthState);
    }
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

