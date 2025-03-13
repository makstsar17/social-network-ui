import { Textarea as HeroTextarea } from "@heroui/react"
import { type Control, useController } from "react-hook-form";

type PropsType = {
    control: Control<any>
    name?: string
    placeholder: string
}

const Textarea = ({ control, name = "content", placeholder }: PropsType) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid },
        formState: { errors }
    } = useController({ name, control });

    return (
        <HeroTextarea
            value={value}
            onValueChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            errorMessage={`${errors[name]?.message}`}
            placeholder={placeholder}
            isClearable
            minRows={3}
            maxRows={6}
            variant="faded"
        />
    )
}

export default Textarea;