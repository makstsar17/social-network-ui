type PropsType = {
    count: number,
    title: string
}

const CountInfo = ({ count, title }: PropsType) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <span className="text-4xl font-bold text-foreground-700">{count}</span>
            <span className="text-medium text-foreground-500">{title}</span>
        </div>
    );
}

export default CountInfo;