import { User } from "@heroui/react";
import { Link } from "react-router-dom";
import { getAvatarUrl } from "../../utils/formatAvatarUrl";

type PropsType = {
    id: string,
    name: string,
    email: string,
    avatarUrl: string
}

const Avatar = ({ id, name, email, avatarUrl }: PropsType) => {
    const baseUrl = getAvatarUrl();
    return (
        <Link to={`/users/${id}`}>
            <User
                name={name}
                description={email}
                avatarProps={{
                    src: `${baseUrl}${avatarUrl}`,
                    size: "md",
                    isBordered: true,
                    showFallback: true
                }} />
        </Link>
    );
}

export default Avatar;