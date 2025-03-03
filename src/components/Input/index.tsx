import { Input } from "@heroui/react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";

type PropsType = {
    label: string,
    placeholder: string,
    name: string,
    type: "text" | "email" | "password",
    endContent?: React.ReactNode,
    control: Control<any>
}

const FormInput = ({
    label,
    placeholder,
    name,
    type,
    endContent,
    control }: PropsType) => {

    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid },
        formState: { errors }
    } = useController({ name, control });

    return (<Input
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        name={name}
        type={type}
        endContent={endContent}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={invalid}
        errorMessage={`${errors[name]?.message}`}
    />);
}

export default FormInput;