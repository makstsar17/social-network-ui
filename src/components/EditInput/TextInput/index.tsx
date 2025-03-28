import { useFormContext } from "react-hook-form";

type PropsType = {
    name: string,
    label: string,

}

const EditInput = ({ name, label }: PropsType) => {
    const { register, formState: { errors } } = useFormContext();

    const validationError = !!errors[name];

    return (
        <div className={`flex w-full px-6 py-4 border-b ${validationError ? "text-danger border-danger" : ""}`}>
            <label className="flex-none font-medium" htmlFor={name}>{label}</label>
            <input
                className={`flex-1 focus:outline-none text-right ${validationError ? "" : "text-foreground-700"}`}
                id={name}
                {...register(name)}
            />
        </div>
    );
}

export default EditInput;