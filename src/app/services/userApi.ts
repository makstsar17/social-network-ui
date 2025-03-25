import type { ID, User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        current: builder.query<User, void>({
            query: () => ({
                url: "users"
            })
        }),
        getUserbyId: builder.query<User, ID>({
            query: ({ id }) => ({
                url: `users/${id}`
            }),
            providesTags: ["User"]
        }),
        follow: builder.mutation<User, ID>({
            query: ({ id }) => ({
                url: `users/follow/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["User"]
        }),
        unfollow: builder.mutation<User, ID>({
            query: ({ id }) => ({
                url: `users/unfollow/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const {
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserbyIdQuery,
    useLazyGetUserbyIdQuery,
    useFollowMutation,
    useUnfollowMutation
} = userApi;