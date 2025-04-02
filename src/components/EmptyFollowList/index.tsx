import { FaUsersViewfinder } from "react-icons/fa6";

type PropsType = {
    content: string
}

const EmptyFollowList = ({ content }: PropsType) => {
    return (
        <div className="flex flex-col items-center text-secondary gap-3 mt-4">
            <FaUsersViewfinder size={70} />
            <h1 className="flex-1 text-center text-bold text-2xl">No {content} Yet</h1>
        </div>
    );
}

export default EmptyFollowList;