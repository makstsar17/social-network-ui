import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import NameInput from "../Input/Name"
import EmailInput from "../Input/Email"
import PasswordInput from "../Input/Password"
import { Button, Link } from "@heroui/react"

type PropsType = {
    setSelected: (value: string) => void
}

type FormValues = {
    email: string,
    name: string,
    password: string
}

const validationSchema = yup.object().shape({
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),

    name: yup.string()
        .required("Name is required"),

    password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
})

const Register = ({ setSelected }: PropsType) => {
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(validationSchema)
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setIsLoading(true);
        console.log(data)
        setIsLoading(false);
    }

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <NameInput name="name" control={control} />
            <EmailInput name="email" control={control} />
            <PasswordInput name="password" control={control} />
            <p className="text-center text-small">
                Already have an account?{" "}
                <Link className="cursor-pointer" onPress={() => setSelected("login")}>
                    Sign in
                </Link>
            </p>
            <Button color="primary" type="submit" isLoading={isLoading}>
                Submit
            </Button>
        </form>
    );
}

export default Register;