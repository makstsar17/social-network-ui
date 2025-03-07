import { Outlet } from "react-router-dom";
import Container from "../Container";
import Header from "../Header";
import NavBar from "../NavBar";
import { useCurrentQuery } from "../../app/services/userApi";
import { Spinner } from "@heroui/react";
import Profile from "../Profile";

const Layout = () => {

    const { isLoading } = useCurrentQuery();

    if (isLoading) {
        return <Spinner size="lg" />
    }

    return (
        <>
            <Header />
            <Container>
                <div className="flex-2 p-4">
                    <NavBar />
                </div>
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
                <div className="flex-2 p-4">
                    <Profile />
                </div>
            </Container>
        </>
    );
}

export default Layout;