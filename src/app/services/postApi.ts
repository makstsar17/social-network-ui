import type { CreatePost, ID, Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, CreatePost>({
            query: (userData) => ({
                url: "posts",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Post"]
        }),
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: "posts",
            }),
            providesTags: ["Post"]
        }),
        deletePost: builder.mutation<void, ID>({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"]
        }),
        likePost: builder.mutation<Post, ID>({
            query: ({ id }) => ({
                url: `posts/like/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Post"]
        }),
        unlikePost: builder.mutation<Post, ID>({
            query: ({ id }) => ({
                url: `posts/unlike/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Post"]
        }),
        getPostById: builder.query<Post, ID>({
            query: ({ id }) => ({
                url: `posts/${id}`
            }),
            providesTags: ["Post"]
        })
    })
});

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useLazyGetAllPostsQuery,
    useDeletePostMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetPostByIdQuery,
    useLazyGetPostByIdQuery
} = postApi;