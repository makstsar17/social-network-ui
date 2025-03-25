import { Button, Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import GoBack from "../../components/GoBack";
import { useParams } from "react-router-dom";
import { useFollowMutation, useGetUserbyIdQuery, useUnfollowMutation } from "../../app/services/userApi";
import ErrorMessage from "../../components/ErrorMessage";
import CountInfo from "../../components/CountInfo";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/userSlice";
import { yearsDiff } from "../../utils/dateDiff";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import ExpandableText from "../../components/ExpandableText";
import ProfileInfo from "../../components/ProfileInfo";
import { useGetPostsByUserQuery } from "../../app/services/postApi";
import Spinner from "../../components/Spinner";
import ThreadPost from "../../components/ThreadPost";

const UserProfile = () => {
    const { id } = useParams<{ id: string }>();

    const { data: user, isLoading: isLoadingUser } = useGetUserbyIdQuery({ id: id ? id : "" });
    const { data: posts, isLoading: isLoadingPosts } = useGetPostsByUserQuery({ id: id ? id : "" })
    const [followUser, { isLoading: isLoadingFollow }] = useFollowMutation();
    const [unfollowUser, { isLoading: isLoadingUnfollow }] = useUnfollowMutation();

    const currentUser = useAppSelector(selectCurrentUser);
    if (!currentUser) {
        return null;
    }

    if (isLoadingUser) {
        return (
            <Spinner />
        );
    }

    if (!user) {
        return <ErrorMessage error="Can't find user" />
    }

    const {
        name,
        email,
        dateOfBirth,
        bio,
        location,
        avatarUrl,
        followers: { length: followersCount },
        following: { length: followingCount },
        isFollowing
    } = user;

    const baseUrl = import.meta.env.VITE_API_URL;

    const handleFollow = () => {
        try {
            if (id) {
                isFollowing ?
                    unfollowUser({id}).unwrap() :
                    followUser({id}).unwrap();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <GoBack />
            <Card className="overflow-visible mb-3">
                <CardHeader className="flex min-h-[175px] items-start justify-between pt-10 px-10">
                    <div className="flex gap-5">
                        <CountInfo title="Followers" count={followersCount} />
                        <CountInfo title="Following" count={followingCount} />
                    </div>
                    <div className="absolute left-[50%] -translate-x-[50%] -top-20">
                        <Image
                            alt="User avatar"
                            src={`${baseUrl}${avatarUrl}`}
                            width={250}
                            height={250}
                            isBlurred
                            radius="full"
                            className="border border-secondary-500 bg-black"
                        />
                    </div>
                    <div className="">
                        {currentUser.id === id ?
                            <Button className="text-xl" color="secondary">
                                Edit
                            </Button> :
                            <Button className="text-xl" color="secondary" onPress={handleFollow} isLoading={isLoadingFollow || isLoadingUnfollow}>
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        }
                    </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-1 items-center">
                    <span className="text-4xl text-foreground-700 mb-2">{name}{dateOfBirth && `, ${yearsDiff(dateOfBirth)}`}</span>
                    <ProfileInfo Icon={IoMdMail} content={email} />
                    {location && <ProfileInfo Icon={MdLocationOn} content={location} />}
                    {bio &&
                        <>
                            <Divider className="my-3" />
                            <ExpandableText content={bio} />
                        </>
                    }
                </CardBody>
            </Card>
            <Divider className="my-5 bg-secondary-500" />
            {isLoadingPosts && <Spinner />}
            <div className="flex flex-col gap-3">
                {posts && posts.map(
                    ({ user, content, createdAt, id, likes, comments, likedByUser }) => (
                        <ThreadPost
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
                        />
                    )
                )}
            </div>
        </>
    );
}

export default UserProfile;