import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../app/services/postApi";
import ErrorMessage from "../../components/ErrorMessage";
import SinglePost from "../../components/SinglePost";
import CreatePostFrom from "../../components/CreateForm";
import { useGetCommentsQuery } from "../../app/services/commentApi";
import ThreadPost from "../../components/ThreadPost";
import GoBack from "../../components/GoBack";
import Spinner from "../../components/Spinner";

const CurrentPost = () => {
    const { id } = useParams<{ id: string }>();
    const { data: post, isLoading: isLoadingPost } = useGetPostByIdQuery({ id: id ? id : "" });
    const { data: comments, isLoading: isLoadingComment } = useGetCommentsQuery({ id: id ? id : "" })

    if (isLoadingPost) {
        return <Spinner />
    }

    if (!post) {
        return <ErrorMessage error="Can't find post" />
    }

    const {
        id: postId,
        content,
        user: { id: authorId, name, email, avatarUrl },
        likes,
        createdAt,
        likedByUser
    } = post;

    const author = { authorId, name, email, avatarUrl };

    return (
        <>
        <GoBack />
        <div className="flex flex-col gap-5">
            <SinglePost
                author={author}
                content={content}
                createdAt={createdAt}
                id={postId}
                likeCount={likes.length}
                commentCount={comments ? comments.length : 0}
                likedByUser={likedByUser}
            />
            <CreatePostFrom type="comment" postId={postId} />
            {isLoadingComment && <Spinner />}
            {comments && comments.map(
                ({ content, id, user }) => (
                    <ThreadPost
                        type="comment"
                        content={content}
                        author={{
                            authorId: user.id,
                            name: user.name,
                            email: user.email,
                            avatarUrl: user.avatarUrl
                        }}
                        id={id}
                        postId={postId}
                    />
                )
            )}
        </div>
        </>
    )
}

export default CurrentPost;