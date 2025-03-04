import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/authApi";
import { changeToken, logout } from "../features/userSlice";

const setTokenToLocalStorage = (payload: any): void => {
    if (payload.token) {
        localStorage.setItem("token", payload.token);
    }
}

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: ({ payload }) => setTokenToLocalStorage(payload)
})

listenerMiddleware.startListening({
    actionCreator: changeToken,
    effect: ({ payload }) => setTokenToLocalStorage({token: payload})
})

listenerMiddleware.startListening({
    actionCreator: logout,
    effect: () => localStorage.removeItem("token")
})