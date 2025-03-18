import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from "@heroui/react";
import Avatar from "../Avatar";
import { dateDiff } from "../../utils/dateDiff";
import { MdDeleteOutline } from "react-icons/md";
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLikePostMutation, useUnlikePostMutation } from "../../app/services/postApi";
import { useState } from "react";
import { hasErrorField } from "../../utils/hasErrorField";
import ErrorMessage from "../ErrorMessage";
import MetaInfo from "../MetaInfo";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

type PropsType = {
    author: {
        authorId: string,
        name: string,
        email: string,
        avatarUrl: string
    },
    content: string,
    createdAt: Date,
    id: string,
    likeCount: number,
    commentCount: number,
    likedByUser: boolean
}

const PostCard = ({
    author: {
        authorId,
        name,
        email,
        avatarUrl
    },
    content,
    createdAt,
    id,
    likeCount,
    commentCount,
    likedByUser
}: PropsType) => {

    const [error, setError] = useState("");

    const [deletePost, { isLoading }] = useDeletePostMutation();
    const [triggerGetPosts] = useLazyGetAllPostsQuery();
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();

    const handleDelete = async () => {
        try {
            await deletePost({ id }).unwrap();
            await triggerGetPosts().unwrap();
        } catch (err) {
            console.error(err);
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    }

    const handleLike = async () => {
        try {
            likedByUser ?
                await unlikePost({ id }).unwrap() :
                await likePost({ id }).unwrap();
            await triggerGetPosts().unwrap();
        } catch (err) {
            console.error(err);
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    }

    return (
        <Card shadow="lg">
            <CardHeader className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <Avatar id={authorId} name={name} email={email} avatarUrl={avatarUrl} />
                    <p className="text-tiny text-foreground-400">&#9679;</p>
                    <p className="text-small text-foreground-400">{dateDiff(createdAt)}</p>
                </div>
                <Button isIconOnly color="secondary" radius="full" onPress={handleDelete} isDisabled={isLoading}>
                    {isLoading ? <Spinner /> : <MdDeleteOutline className="text-xl" />} 
                </Button>
            </CardHeader>
            <CardBody>
                <p className="text-xl">
                    {content}
                </p>
            </CardBody>
            <CardFooter>
                <div className="flex gap-3">
                    <Link to={`/posts/${id}`}>
                        <MetaInfo Icon={FaRegComment} count={commentCount} />
                    </Link>
                    <div className="cursor-pointer" onClick={handleLike}>
                        <MetaInfo Icon={
                            likedByUser ? FaHeart : FaRegHeart
                        } count={likeCount} />
                    </div>
                </div>
                <ErrorMessage error={error} />
            </CardFooter>
        </Card>
    );
}

export default PostCard;