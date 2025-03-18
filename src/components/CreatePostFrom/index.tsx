import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Textarea from "../Textarea";
import { Button } from "@heroui/react";
import { useState } from "react";
import { GiFeather } from "react-icons/gi";
import ErrorMessage from "../ErrorMessage";
import { useCreatePostMutation, useLazyGetAllPostsQuery } from "../../app/services/postApi";
import { hasErrorField } from "../../utils/hasErrorField";


type FormValues = {
    content: string
}

const validationSchema = yup.object().shape({
    content: yup.string()
        .required("Write content before creating post")
        .max(280, "Post must be maximum 280 characters long")
})

const CreatePostFrom = () => {
    const [error, setError] = useState("");

    const [createPost, { isLoading }] = useCreatePostMutation();
    const [triggerGetPosts] = useLazyGetAllPostsQuery();

    const { control, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            content: ""
        },
        mode: "onSubmit",
        reValidateMode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createPost(data).unwrap();
            setValue("content", "");
            await triggerGetPosts().unwrap();
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };

    return <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Textarea control={control} placeholder="What's happening?" />
        <ErrorMessage error={error} />
        <Button
            className="self-end"
            type="submit"
            color="secondary"
            variant="bordered"
            endContent={<GiFeather />}
            isLoading={isLoading}
        >
            Post
        </Button>
    </form>
}

export default CreatePostFrom;