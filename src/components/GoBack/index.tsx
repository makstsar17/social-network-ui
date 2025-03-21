import { Button } from "@heroui/react";
import { PiArrowCircleLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <Button
            endContent={<PiArrowCircleLeft size={30}/>}
            variant="bordered"
            onPress={handleClick}
            color="secondary"
            className="m-3"
        >
            Go back
        </Button>
    );
}

export default GoBack;