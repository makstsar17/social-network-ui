import type { IconType } from "react-icons";

type PropsType = {
    content: string,
    Icon: IconType
}

const ProfileInfo = ( {content, Icon} : PropsType ) => {
    return (
        <span className="flex text-xl items-center gap-2 text-foreground-500">
            <Icon />
            {content}
        </span>
    );
}

export default ProfileInfo;