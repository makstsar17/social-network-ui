import { Button, Link } from "@heroui/react";
import EmailInput from "../Input/Email";
import PasswordInput from "../Input/Password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from "../../app/services/authApi";
import { hasErrorField, hasErrorsField } from "../../utils/hasErrorField";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";


type PropsType = {
    setSelected: (value: string) => void
}

type FormValues = {
    email: string,
    password: string
}

const validationSchema = yup.object().shape({
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: yup.string()
        .required("Password is required")
})

const Login = ({ setSelected }: PropsType) => {
    const [error, setError] = useState<string>();
    const [errors, setErrors] = useState<[{ msg: string }]>();

    const [login, { isLoading }] = useLoginMutation();

    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await login(data).unwrap();
            navigate("/");
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
            else if (hasErrorsField(err)) {
                setErrors(err.data.errors)
            }
        }
    }

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <EmailInput name={"email"} control={control} />
            <PasswordInput name={"password"} control={control} />

            <ErrorMessage error={error} errors={errors} />

            <p className="text-center text-small">
                Don't have an account, yet?{" "}
                <Link className="cursor-pointer" onPress={() => setSelected("signUp")}>Sign up now</Link>
            </p>

            <Button className="w-full" color="primary" type="submit" isLoading={isLoading}>
                Submit
            </Button>
        </form>
    )
}

export default Login;