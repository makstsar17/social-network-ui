import { Button, Link } from "@heroui/react";
import EmailInput from "../Input/Email";
import PasswordInput from "../Input/Password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


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
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        setIsLoading(false);
    }

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <EmailInput name={"email"} control={control} />
            <PasswordInput name={"password"} control={control} />
            <p className="text-center text-small">
                Don't have an account yet?{" "}
                <Link className="cursor-pointer" onPress={() => setSelected("signUp")}>Sign up now</Link>
            </p>
            <Button className="w-full" color="primary" type="submit" isLoading={isLoading}>
                Submit
            </Button>
        </form>
    )
}

export default Login;