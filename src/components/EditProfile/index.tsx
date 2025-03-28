import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"
import Avatar from "../Avatar"
import * as yup from "yup"
import { isVaildFileSize, isValidFileType } from "../../utils/fileValidator"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import type { User } from "../../app/types"
import { yupResolver } from "@hookform/resolvers/yup"
import EditInput from "../EditInput/TextInput"
import FileInput from "../EditInput/FileInput"
import ErrorMessage from "../ErrorMessage"
import DateInput from "../EditInput/DateInput"
import TextareaInput from "../EditInput/TextareaInput"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { getYesterday } from "../../utils/dateDiff"
import { useState } from "react"
import { hasErrorField } from "../../utils/hasErrorField"

type PropsType = {
    user: User,
    isOpen: boolean,
    onOpenChange: () => void,
    onClose: () => void
}

type FormValues = {
    email: string,
    name: string,
    dateOfBirth?: Date,
    bio?: string,
    location?: string,
    avatar?: File | FileList
}

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    name: yup.string().required().min(3).max(50),
    dateOfBirth: yup
        .date()
        .transform((value, originalValue) => originalValue === "" ? undefined : value
        )
        .optional()
        .test("is-allowable-date", "Not a valid date of birth",
            value => {
                if (!value) return true;
                else if (value && value < getYesterday()) return true;
                else return false;
            }
        ),
    bio: yup.string().max(500).optional(),
    location: yup.string().max(100).optional(),
    avatar: yup.mixed<File | FileList>().optional()
        .test("is-valid-type", "Not a valid image type",
            value => {
                if (value && value instanceof FileList && value.length === 0) return true;
                else if (value && value instanceof File && isValidFileType(value)) return true;
                else return false;
            }
        )
        .test("is-valid-size", "Max allowed size is 1MB",
            value => {
                if (value && value instanceof FileList && value.length === 0) return true;
                else if (value && value instanceof File && isVaildFileSize(value)) return true;
                else return false;
            }
        )
})

const EditProfile = ({
    isOpen,
    onOpenChange,
    onClose,
    user: {
        id,
        email,
        name,
        dateOfBirth,
        bio,
        location,
        avatarUrl
    }
}: PropsType) => {

    const [updateUser] = useUpdateUserMutation();

    const [error, setError] = useState("");

    const methods = useForm<FormValues>({
        defaultValues: {
            email,
            name,
            dateOfBirth,
            bio: bio ? bio : "",
            location,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors }, control } = methods;

    const errorsMessages = Object.values(errors).map(error => error.message)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const updatedFields: any = {};

        const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;
        if (data.name !== name) updatedFields.name = data.name;
        if (data.email !== email) updatedFields.email = data.email;
        if (data.dateOfBirth?.getTime() !== parsedDateOfBirth?.getTime()) updatedFields.dateOfBirth = data.dateOfBirth;
        if (data.bio && data.bio !== bio) updatedFields.bio = data.bio;
        if (data.location !== location) updatedFields.location = data.location;
        if (data.avatar instanceof File) updatedFields.avatar = data.avatar;

        if (Object.keys(updatedFields).length !== 0) {
            try {
                await updateUser(
                    {
                        id,
                        ...updatedFields
                    }
                ).unwrap();
                onClose();
            } catch (err) {
                if (hasErrorField(err))
                    setError(err.data.error);
            }
        } else onClose();
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader className="border-b-3">
                                <Avatar id={id} name={name} email={email} avatarUrl={avatarUrl} />
                            </ModalHeader>
                            <ModalBody className="py-2 px-0">
                                <FormProvider {...methods}>
                                    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                                        <EditInput name="name" label="Name" />
                                        <EditInput name="email" label="Email" />
                                        <EditInput name="location" label="Location" />
                                        <FileInput name="avatar" />
                                        <DateInput name="dateOfBirth" />
                                        <TextareaInput name="bio" control={control} />
                                        <Button color="success" variant="ghost" type="submit" size="lg" className="mt-4 mr-4 w-fit px-1 self-end">
                                            Submit
                                        </Button>
                                    </form>
                                </FormProvider>
                            </ModalBody>
                            {
                                (errorsMessages.length !== 0 || error) &&
                                <ModalFooter className="flex flex-col gap-1">
                                    {Object.values(errors).map(error => <ErrorMessage key={error.message} error={error.message} />)}
                                    {error && <ErrorMessage error={error} />}
                                </ModalFooter>
                            }
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    );
}

export default EditProfile;