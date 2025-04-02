import { useState } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
    name: string
}

const FileInput = ({ name }: PropsType) => {

    const [selectedFileName, setSelectedFileName] = useState<string | undefined>(undefined);

    const { register, setValue, formState: { errors } } = useFormContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFileName(file.name);
            setValue(name, file, { shouldValidate: true });
        } else {
            setValue(name, null, { shouldValidate: true });
        }
    }

    const validationError = !!errors[name];

    return (
        <div className={`flex px-6 py-4 justify-between items-center border-b ${validationError ? "text-danger border-danger" : "."}`}>
            <label className="font-medium">Avatar</label>
            <label
                htmlFor={name}
                className={"py-2 px-3 border-medium rounded-medium cursor-pointer text-center w-fit max-w-[200px] line-clamp-1" +
                    `${validationError ? " border-danger bg-danger-50" : " bg-default-100 border-default-200 hover:border-default-400"}` +
                    `${selectedFileName ? " text-foreground-700" : " text-foreground-500"}`
                }>
                {selectedFileName || "Choose image"}
            </label>
            <input
                {...register(name)}
                id={name}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}

export default FileInput;