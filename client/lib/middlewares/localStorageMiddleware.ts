import { Middleware } from "@reduxjs/toolkit";

const localStorageMiddleWare: Middleware = storeApi => next => action => {
   const result = next(action);

   if (typeof window !== "undefined") {
      const state = storeApi.getState();
      // things to do in with localstorage such as updating seting data to the store
      // localStorage.setItem("isAdmin", state.admin.isAdmin.toString());
   }
   return result;
};

export default localStorageMiddleWare;
