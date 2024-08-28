import { Middleware } from "@reduxjs/toolkit";

const localStorageMiddleware:Middleware = storeApi=>next=>action=>{
    const result = next(action);
    if(typeof window!==undefined){
        const state = storeApi.getState();
        localStorage.setItem("auth", state.auth.token);
    }
    return result
};

export default localStorageMiddleware