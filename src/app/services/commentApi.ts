import type { Comment, CreateComment, ID } from "../types";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<Comment, CreateComment>({
            query: (data) => ({
                url: "comments",
                method: "POST",
                body: data
            })
        }),
        getComments: builder.query<Comment[], ID>({
            query: ({ id }) => ({
                url: `comments?postId=${id}`
            })
        }),
        deleteComment: builder.mutation<void, ID>({
            query: ({ id }) => ({
                url: `comments/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useCreateCommentMutation,
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useDeleteCommentMutation
} = commentApi;