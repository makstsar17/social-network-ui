import PostsFeed from "..";
import { useGetAllPostsQuery } from "../../../app/services/postApi";

const PostsFeedAll = () => {
    const { data, isLoading } = useGetAllPostsQuery();

    if(!data)
        return null;

    return <PostsFeed data={data} isLoading={isLoading} />
}

export default PostsFeedAll;