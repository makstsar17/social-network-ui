import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold">social network</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default Header;