import type { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        current: builder.query<User, void>({
            query: () => ({
                url: "users"
            })
        })
    })
});

export const { useCurrentQuery, useLazyCurrentQuery } = userApi;