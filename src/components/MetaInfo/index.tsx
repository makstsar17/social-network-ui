import { semanticColors } from "@heroui/react";
import type { IconType } from "react-icons";

type PropsType = {
    count: number,
    Icon: IconType
}

const MetaInfo = ({ count, Icon }: PropsType) => {
    return (
        <div className="flex gap-1 items-center">
            <Icon color={semanticColors.dark.secondary[500]} />
            <p className={`text-small ${count > 0 ? "" : "opacity-0"}`}>{count}</p>
        </div>
    );
}

export default MetaInfo;