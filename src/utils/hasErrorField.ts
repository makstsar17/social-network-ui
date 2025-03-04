type DataObject = {
    data: {}
}

type ErrorObjectString = {
    data: {
        error: string
    }
}

type ErrorObjectArray = {
    data: {
        errors: [{
            msg: string
        }]
    }
}

const hasDataField = (obj: unknown): obj is DataObject => {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "data" in obj &&
        typeof obj.data === "object" &&
        obj.data !== null
    );
}

export const hasErrorField = (obj: unknown): obj is ErrorObjectString => {
    return (
        hasDataField(obj) &&
        "error" in obj.data &&
        typeof obj.data.error === "string"
    )
}

export const hasErrorsField = (obj: unknown): obj is ErrorObjectArray => {
    return (
        hasDataField(obj) &&
        "errors" in obj.data &&
        Array.isArray(obj.data.errors) &&
        obj.data.errors.every(
            err => typeof err === "object" &&
                "msg" in err &&
                typeof err.msg === "string"
        )
    );
}