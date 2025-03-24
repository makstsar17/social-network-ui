import { Divider } from "@heroui/react";
import { useGetAllPostsQuery } from "../../app/services/postApi";
import ThreadPost from "../../components/ThreadPost";
import CreatePostFrom from "../../components/CreateForm";
import Spinner from "../../components/Spinner";


const Posts = () => {
    const { data, isLoading } = useGetAllPostsQuery();

    return (
        <div className="min-w-[200px] w-full flex flex-col gap-3">
            <CreatePostFrom type="post"/>
            <Divider className="my-5" />
            {isLoading && <Spinner />}
            {(data && data.length > 0) &&
                data.map(({ user, content, createdAt, id, likes, comments, likedByUser }) => <ThreadPost
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
                    type="post"
                />)
            }
        </div>
    );
}

export default Posts;