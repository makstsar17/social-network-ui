import type { CreatePost, Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, CreatePost>({
            query: (userData) => ({
                url: "posts",
                method: "POST",
                body: userData
            })
        })
    })
});

export const { useCreatePostMutation } = postApi;