import PostsFeed from "..";
import { useGetPostsByFollowingsQuery } from "../../../app/services/postApi";

const PostsFeedFollowing = () => {
    const { data, isLoading } = useGetPostsByFollowingsQuery();

    if(!data)
        return null;

    return <PostsFeed data={data} isLoading={isLoading} />
}

export default PostsFeedFollowing;