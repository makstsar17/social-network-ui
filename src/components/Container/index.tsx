import type { ReactNode } from "react"

type PropsType = {
    children: ReactNode
}

const Container = ({ children }: PropsType) => {
    return (
        <div className="flex max-w-2xl mt-10 mx-auto">
            {children}
        </div>
    )
}

export default Container;