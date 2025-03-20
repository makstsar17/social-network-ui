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
import { useCreateCommentMutation, useLazyGetCommentsQuery } from "../../app/services/commentApi";


type FormValues = {
    content: string,
    postId?: string
}

const validationSchema = yup.object().shape({
    content: yup.string()
        .required("Write content before creating post")
        .max(280, "Post must be maximum 280 characters long"),
    postId: yup.string()
        .optional()
        .length(24, "PosId must be 24 characters long")
})

type PropsType =
    | { type: "post" }
    | { type: "comment", postId: string }

const CreatePostFrom = (props: PropsType) => {
    const [error, setError] = useState("");

    const [createPost, { isLoading: isLoadingPost }] = useCreatePostMutation();
    const [triggerGetPosts] = useLazyGetAllPostsQuery();

    const [createComment, { isLoading: isLoadingComment }] = useCreateCommentMutation();
    const [triggerGetComments] = useLazyGetCommentsQuery();

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
            switch (props.type) {
                case "post":
                    await createPost(data).unwrap();
                    await triggerGetPosts().unwrap();
                    break;
                case "comment":
                    await createComment({
                        ...data,
                        postId: props.postId
                    }).unwrap();
                    await triggerGetComments({ id: props.postId }).unwrap;
            }
            setValue("content", "");
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };

    return <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Textarea
            control={control}
            placeholder={props.type === "post" ? "What's happening?" : "Post your reply"}
            variant={props.type === "post" ? "faded" : "underlined"} />
        <ErrorMessage error={error} />
        <Button
            className="self-end"
            type="submit"
            color="secondary"
            variant="bordered"
            endContent={<GiFeather />}
            isLoading={props.type === "post" ? isLoadingPost : isLoadingComment}
        >
            {props.type === "post" ? "Post" : "Reply"} "What's happening?"
        </Button>
    </form>
}

export default CreatePostFrom;