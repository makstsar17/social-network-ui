import type { Control } from "react-hook-form";
import Textarea from "../../Textarea";

type PropsType = {
    control: Control<any>,
    name: string
}

const TextareaInput = ({ control, name }: PropsType) => {
    return (
        <>
            <label htmlFor=""></label>
            <Textarea name={name} control={control} placeholder="Tell us a little about yourself..."
                variant="underlined"
                label="Bio"
                displayErrorMessage={false}
                classNames={{
                    input: 'group[data-has-value="true"]:text-foreground-700 placeholder:text-foreground-500',
                    innerWrapper: "px-6 py-2",
                    label: "px-6 pt-4 font-medium text-medium",
                    inputWrapper: "border-b-1"
                }}
            />
        </>
    );
}

export default TextareaInput;