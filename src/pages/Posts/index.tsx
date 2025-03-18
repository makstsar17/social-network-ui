import { Divider, Spinner } from "@heroui/react";
import { useGetAllPostsQuery } from "../../app/services/postApi";
import CreatePostFrom from "../../components/CreatePostFrom";
import PostCard from "../../components/PostCard";

const Posts = () => {
    const { data, isLoading } = useGetAllPostsQuery();

    return (
        <div className="min-w-[200px] w-full flex flex-col gap-3">
            <CreatePostFrom />
            <Divider className="my-5" />
            {isLoading && <Spinner color="secondary" />}
            {(data && data.length > 0) &&
                data.map(({ user, content, createdAt, id, likes, comments, likedByUser }) => <PostCard
                    key={id}
                    author={{
                        authorId: user.id,
                        name: user.name,
                        email: user.email,
                        avatarUrl: user.avatarUrl
                    }}
                    content={content}
                    createdAt={createdAt}
                    id={id}
                    likeCount={likes.length}
                    commentCount={comments.length}
                    likedByUser={likedByUser}
                />)
            }
        </div>
    );
}

export default Posts;