import type { ID, UpdateUser, User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        current: builder.query<User, void>({
            query: () => ({
                url: "users"
            }),
            providesTags: ["User"]
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
        }),
        updateUser: builder.mutation<User, Partial<UpdateUser> & Pick<User, "id">>({
            query: ({ id, ...data }) => {
                const formData = new FormData();
                Object.keys(data).forEach(attr => {
                    const key = attr as keyof UpdateUser;
                    const value = data[key];
                    if (value)
                        formData.append(attr, value as string | Blob);
                });
                return {
                    url: `users/${id}`,
                    method: "PATCH",
                    body: formData,
                }
            },
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
    useUnfollowMutation,
    useUpdateUserMutation
} = userApi;