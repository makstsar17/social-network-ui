import { Button } from "@heroui/react";
import { useState } from "react";
import type { Control } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormInput from "..";

type PropsType = {
    name: string,
    control: Control<any>
}

const PasswordInput = ({ name, control }: PropsType) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => { setIsVisible(!isVisible) };

    return (
        <FormInput
            name={name}
            control={control}
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            endContent={<Button
                isIconOnly
                aria-label="Toggle password visibility"
                variant="light"
                onPress={toggleVisibility}
            >
                {isVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </Button>}
        />
    )
}

export default PasswordInput;