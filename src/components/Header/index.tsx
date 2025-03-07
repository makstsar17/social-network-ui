import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import ThemeToggle from "../ThemeToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectIsAuthenticated } from "../../features/userSlice";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(logout());
    }

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold">social network</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>
                {isAuthenticated && <NavbarItem>
                    <Button
                        color="secondary"
                        variant="ghost"
                        startContent={<IoLogOutOutline />}
                        onPress={onClick}
                    >
                        Logout
                    </Button>
                </NavbarItem>}
            </NavbarContent>
        </Navbar>
    );
}

export default Header;