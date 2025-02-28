import type React from "react";
import { Button } from "../Button";
import { NavLink, useMatch } from "react-router-dom"

type PropsType = {
    icon: React.ReactNode,
    href: string
}


const NavButton = ({ children, icon, href }: React.PropsWithChildren<PropsType>) => {
    const isActive = useMatch(href);
    return (
        <Button className="flex justify-start" icon={icon} color={isActive ? "secondary" : "default"}>
            <NavLink to={href}>
                {children}
            </NavLink>
        </Button>
    )
}

export default NavButton;