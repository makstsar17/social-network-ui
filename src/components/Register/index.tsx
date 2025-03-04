import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import NameInput from "../Input/Name"
import EmailInput from "../Input/Email"
import PasswordInput from "../Input/Password"
import { Button, Link } from "@heroui/react"
import { useRegisterMutation } from "../../app/services/authApi"
import { hasErrorField, hasErrorsField } from "../../utils/hasErrorField"
import ErrorMessage from "../ErrorMessage"

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
    const [error, setError] = useState<string>();
    const [errors, setErrors] = useState<[{ msg: string }]>();

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

    const [register, { isLoading }] = useRegisterMutation();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await register(data).unwrap()
            setSelected("login")
        } catch (err) {
            if (hasErrorField(err)) {        
                setError(err.data.error);
            }
            else if (hasErrorsField(err)) {
                setErrors(err.data.errors);
            }
        }
    }

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <NameInput name="name" control={control} />
            <EmailInput name="email" control={control} />
            <PasswordInput name="password" control={control} />

            <ErrorMessage error={error} errors={errors} />

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