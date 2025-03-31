import { Divider, Spinner } from "@heroui/react";
import CreatePostFrom from "../CreateForm";
import type { Post } from "../../app/types";
import ThreadPost from "../ThreadPost";
import { BsFillFileTextFill } from "react-icons/bs";

type PropsType = {
    data: Post[],
    isLoading: boolean
}

const PostsFeed = ({ data, isLoading }: PropsType) => {
    return (
        <div className="min-w-[200px] w-full flex flex-col gap-3">
            <CreatePostFrom type="post" />
            <Divider className="my-5" />
            {isLoading && <Spinner />}
            {(data.length === 0) &&
                <div className="flex flex-col items-center text-secondary gap-1 mt-4">
                    <BsFillFileTextFill size={70} />
                    <h1 className="flex-1 text-center text-bold text-2xl">No Posts Yet</h1>
                </div>
            }
            {(data.length > 0) &&
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

export default PostsFeed;