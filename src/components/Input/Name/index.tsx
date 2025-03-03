import type { Control } from "react-hook-form";
import FormInput from "..";

type PropsType = {
    name: string,
    control: Control<any>
}

const NameInput = ( {name, control}: PropsType ) => {
    return (
        <FormInput 
            label="Name"
            placeholder="Enter your name"
            name={name}
            type="text"
            control={control}
        />
    );
}

export default NameInput;