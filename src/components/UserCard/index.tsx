import { Button, Card, CardBody } from "@heroui/react";
import Avatar from "../Avatar";
import { useFollowMutation, useUnfollowMutation } from "../../app/services/userApi";
import { useState } from "react";
import type { User } from "../../app/types";

type PropsType = {
    data: User[]
}

const UserCard = ({ data }: PropsType) => {
    const [follow, { isLoading: isLoadingFollow }] = useFollowMutation();
    const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowMutation();

    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleFollowing = async (id: string, isFollowing: boolean) => {
        setLoadingId(id);
        try {
            isFollowing ?
                await unfollow({ id }).unwrap() :
                await follow({ id }).unwrap();

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {
                data.map((user) => (
                    <Card key={user.id}>
                        <CardBody className="flex flex-row justify-between items-center">
                            <Avatar
                                id={user.id}
                                name={user.name}
                                email={user.email}
                                avatarUrl={user.avatarUrl}
                            />
                            <Button
                                color="secondary"
                                variant="ghost"
                                onPress={() => handleFollowing(user.id, user.isFollowing)}
                                isLoading={(loadingId === user.id) && (isLoadingFollow || isLoadingUnfollow)}>
                                {user.isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </CardBody>
                    </Card>
                ))
            }
        </div>
    );
}

export default UserCard;