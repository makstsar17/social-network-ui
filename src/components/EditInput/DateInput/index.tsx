import { useFormContext } from "react-hook-form";

type PropsType = {
    name: string,
}

const DateInput = ({ name }: PropsType) => {
    const { register, watch } = useFormContext();

    const value = watch(name) as string;

    return (
        <>
            <div className="px-6 py-4 flex justify-between items-center border-b">
                <label htmlFor={name} className="font-medium">Birth date</label>
                <input
                    {...register(name)}
                    value={value ? value.split("T")[0] : ""}
                    type="date"
                    id={name}
                    className={"py-2 px-3 border-medium rounded-medium bg-default-100 border-default-200 hover:border-default-400 " +
                        `${value ? "text-foreground-700" : "text-foreground-500"}`
                    }
                />
            </div>
        </>
    );
}

export default DateInput;