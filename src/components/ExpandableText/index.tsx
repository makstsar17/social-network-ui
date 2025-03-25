import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type PropsType = {
    content: string
}

const ExpandableText = ({ content }: PropsType) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex flex-col gap-1 items-center">
            <p className={`text-xl text-foreground-500 px-10 text-center transition-all duration-300 ease-in-out ${expanded ? "" : "line-clamp-2"}`}>
                {content}
            </p>
            <span
                className="flex items-center text-large text-foreground-600 cursor-pointer"
                onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show less" : "Show more"}
                {expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </span>
        </div>
    );
}

export default ExpandableText;