import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from "@heroui/react";
import Avatar from "../Avatar";
import { useDeletePostMutation, useLazyGetPostByIdQuery, useLikePostMutation, useUnlikePostMutation } from "../../app/services/postApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { hasErrorField } from "../../utils/hasErrorField";
import { MdDeleteOutline } from "react-icons/md";
import { formatDate } from "../../utils/formatDate";
import MetaInfo from "../MetaInfo";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";
import ErrorMessage from "../ErrorMessage";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/userSlice";

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
    likedByUser: boolean,
}

const SinglePost = ({
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
    const [deletePost, { isLoading }] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const currentUser = useAppSelector(selectCurrentUser);

    const handleDelete = async () => {
        try {
            await deletePost({ id });
            navigate("/");
        } catch (err) {
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
            await triggerGetPostById({ id }).unwrap();
        } catch (err) {
            console.error(err);
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <Card shadow="lg">
                <CardHeader className="flex justify-between">
                    <Avatar id={authorId} name={name} email={email} avatarUrl={avatarUrl} />
                    {currentUser?.id === authorId &&
                        <Button isIconOnly color="secondary" radius="full" onPress={handleDelete} isDisabled={isLoading}>
                            {isLoading ? <Spinner /> : <MdDeleteOutline className="text-xl" />}
                        </Button>
                    }
                </CardHeader>
                <CardBody>
                    <p className="text-large">
                        {content}
                    </p>
                </CardBody>
                <CardFooter className="flex flex-col items-start gap-1">
                    <p className="text-foreground-500 text-small">
                        {formatDate(createdAt)}
                    </p>
                    <Divider />
                    <div className="flex gap-3">
                        <div className="cursor-pointer" onClick={() => { }}>
                            <MetaInfo Icon={FaComment} count={commentCount} />
                        </div>

                        <div className="cursor-pointer" onClick={handleLike}>
                            <MetaInfo Icon={
                                likedByUser ? FaHeart : FaRegHeart
                            } count={likeCount} />
                        </div>
                    </div>
                    <ErrorMessage error={error} />
                </CardFooter>
            </Card>
        </div>
    );
}

export default SinglePost;