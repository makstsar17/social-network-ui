import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../app/types"
import { authApi } from "../app/services/authApi";
import type { RootState } from "../app/store";
import { userApi } from "../app/services/userApi";

type UserState = {
    currentUser: User | null,
    isAuthenticated: boolean,
    token: string | null
};

const initialState: UserState = {
    currentUser: null,
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token")
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeToken: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        });
        builder.addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
            state.currentUser = action.payload;
        })
    }
})

export const { changeToken, logout } = userSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;