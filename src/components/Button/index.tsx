import { Button as HeroButton } from "@heroui/react"

type ColorType = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

type PropsType = {
    children: React.ReactNode,
    className?: string,
    icon?: React.ReactNode,
    color?: ColorType
}

export const Button = ({ children, className, icon, color }: PropsType) => {
    return <HeroButton
        className={className}
        startContent={icon}
        size="lg"
        fullWidth={true}
        variant="light"
        color={color}
    >
        {children}
    </HeroButton>
}