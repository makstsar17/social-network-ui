import { Card, CardFooter, Image } from "@heroui/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/userSlice";
import { getAvatarUrl } from "../../utils/formatAvatarUrl";

const Profile = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    if (!user) {
        return null;
    }
    const { id, name, email, avatarUrl } = user;

    const onPress = () => {
        navigate(`/users/${id}`);
    }
    const baseUrl = getAvatarUrl();

    return (
        <Card
            isFooterBlurred
            isPressable
            onPress={onPress}
            className="w-[250px]">
            <Image
                removeWrapper
                isZoomed
                alt="Profile avatar"
                src={`${baseUrl}${avatarUrl}`}
                className="w-full h-full object-cover z-0"
            />
            <CardFooter className="border-t-1 border-zinc-100/50 flex-col gap-1 z-10 ">
                <p className="font-bold">{name}</p>
                <p className="flex items-center text-default-500 text-sm">
                    <MdOutlineAlternateEmail />
                    {email}
                </p>
            </CardFooter>
        </Card>
    );
}

export default Profile;