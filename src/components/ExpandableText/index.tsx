import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type PropsType = {
    content: string
}

const ExpandableText = ({ content }: PropsType) => {
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverFlowing] = useState(false);

    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries){
                console.log(entry.target.clientHeight)
                console.log(entry.target.scrollHeight)
                if (entry.target.clientHeight < entry.target.scrollHeight){
                    setIsOverFlowing(true);
                }
                else {
                    setIsOverFlowing(false);
                }
            }
        });

        textRef.current && observer.observe(textRef.current);
        return () => {
            observer.disconnect();
        }
    }, []);

    return (
        <div className="flex flex-col gap-1 items-center">
            <p ref={textRef} className={`text-xl text-foreground-500 px-10 text-center ${expanded ? "" : "line-clamp-2"}`}>
                {content}
            </p>
            {
                isOverflowing &&
                <span
                    className="flex items-center text-large text-foreground-600 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Show less" : "Show more"}
                    {expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </span>
            }
        </div>
    );
}

export default ExpandableText;