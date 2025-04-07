import { Avatar, Button, Card, CardBody, CardFooter, Spinner } from "@heroui/react"
import { dateDiff } from "../../utils/dateDiff"
import { Link } from "react-router-dom"
import MetaInfo from "../MetaInfo"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { useDeletePostMutation, useLikePostMutation, useUnlikePostMutation } from "../../app/services/postApi"
import { hasErrorField } from "../../utils/hasErrorField"
import { useState } from "react"
import { useDeleteCommentMutation } from "../../app/services/commentApi"
import { useAppSelector } from "../../app/hooks"
import { selectCurrentUser } from "../../features/userSlice"
import ErrorMessage from "../ErrorMessage"
import { getAvatarUrl } from "../../utils/formatAvatarUrl"

type BaseProps = {
    author: {
        authorId: string,
        name: string,
        email: string,
        avatarUrl: string
    },
    content: string,
    id: string,
}

type CommentProps = BaseProps & {
    type: "comment",
    postId: string
}

type PostProps = BaseProps & {
    type: "post",
    createdAt: Date,
    likeCount: number,
    commentCount: number,
    likedByUser: boolean
}

type PropsType = CommentProps | PostProps

const ThreadPost = (props: PropsType) => {
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [deletePost, { isLoading: isLoadingDeletePost }] = useDeletePostMutation();
    const [deleteComment, { isLoading: isLoadingDeleteComment }] = useDeleteCommentMutation();

    const [error, setError] = useState("");

    const currentUser = useAppSelector(selectCurrentUser);

    const baseUrl = getAvatarUrl();
    const { author, content, id } = props;
    const isLoading = props.type === "post" ? isLoadingDeletePost : isLoadingDeleteComment;

    const handleLike = async () => {
        try {
            props.type === "post" && props.likedByUser ?
                await unlikePost({ id }).unwrap() :
                await likePost({ id }).unwrap();

        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    }

    const handleDelete = async () => {
        try {
            switch (props.type) {
                case "post":
                    await deletePost({ id }).unwrap();
                    break;
                case "comment":
                    await deleteComment({ id }).unwrap();
                    break;
            }
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    }

    return (
        <Card shadow="lg">
            <CardBody className="flex flex-row justify-between">
                <div className="flex items-start">
                    <Link to={`/users/${author.authorId}`} className="flex-none mr-2">
                        <Avatar
                            src={`${baseUrl}${author.avatarUrl}`}
                            size="md"
                            isBordered
                            showFallback
                        />
                    </Link>
                    <div className="flex flex-col">
                        <div className="inline-flex items-end gap-1 text-small mb-3">
                            <Link to={`/users/${author.authorId}`} className="inline-flex gap-1">
                                <span className="text-inherit font-bold">{author.name}</span>
                                <span className="text-foreground-400">{author.email}</span>
                            </Link>
                            {props.type === "post" &&
                                <>
                                    <span className="text-foreground-400 text-tiny self-center"> &#9679; </span>
                                    <span className="text-foreground-400">{dateDiff(props.createdAt)}</span>
                                </>
                            }
                        </div>
                        <p className={props.type === "post" ? "text-large" : "text-medium"}>
                            {content}
                        </p>
                        {props.type === "post" &&
                            <div className="flex gap-3 mt-3">
                                <Link to={`/posts/${props.id}`}>
                                    <MetaInfo Icon={FaRegComment} count={props.commentCount} />
                                </Link>
                                <div className="cursor-pointer" onClick={handleLike}>
                                    <MetaInfo Icon={
                                        props.likedByUser ? FaHeart : FaRegHeart
                                    } count={props.likeCount} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {currentUser?.id === author.authorId &&
                    <Button isIconOnly radius="full" color="secondary" onPress={handleDelete} isLoading={false}>
                        {isLoading ? <Spinner /> : <MdDeleteOutline className="text-xl" />}
                    </Button>
                }
            </CardBody>
            {error !== "" &&
                <CardFooter>
                    <ErrorMessage error={error} />
                </CardFooter>
            }
        </Card>
    );
}

export default ThreadPost;