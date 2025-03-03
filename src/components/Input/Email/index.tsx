import type { Control } from "react-hook-form";
import FormInput from "..";

type PropsType = {
    name: string,
    control: Control<any>
}

const EmailInput = ({ name, control }: PropsType) => {
    return (
        <FormInput
            name={name}
            control={control}
            label="Email"
            type="email"
            placeholder="Enter your email"
        />
    )
}

export default EmailInput; 