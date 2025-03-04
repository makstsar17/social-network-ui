type PropsType = {
    error?: string,
    errors?: [{
        msg: string
    }]
}

const ErrorMessage = ({ error, errors }: PropsType) => {
    const styles = "text-danger text-small";

    if (error) {
        return <p className={styles}>{error}</p>;
    }
    if (errors && errors.length > 0) {
        return (
            <ul className={styles}>
                {errors.map((err, ind) => <li key={ind}>{err.msg}</li>)}
            </ul>
        )
    }
}

export default ErrorMessage;