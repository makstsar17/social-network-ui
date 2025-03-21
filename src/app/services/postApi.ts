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
        }),
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: "posts",
            })
        }),
        deletePost: builder.mutation<void, ID>({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: "DELETE",
            })
        }),
        likePost: builder.mutation<Post, ID>({
            query: ({ id }) => ({
                url: `posts/like/${id}`,
                method: "PATCH"
            })
        }),
        unlikePost: builder.mutation<Post, ID>({
            query: ({ id }) => ({
                url: `posts/unlike/${id}`,
                method: "PATCH"
            })
        }),
        getPostById: builder.query<Post, ID>({
            query: ({ id }) => ({
                url: `posts/${id}`
            })
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