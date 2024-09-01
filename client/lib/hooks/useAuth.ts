"use client";
import { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
