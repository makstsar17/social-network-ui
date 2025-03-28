import { Outlet, useParams } from "react-router-dom";
import Container from "../Container";
import Header from "../Header";
import NavBar from "../NavBar";
import { useCurrentQuery } from "../../app/services/userApi";
import Spinner from "../Spinner";
import Profile from "../Profile";

const Layout = () => {

    const { data, isLoading } = useCurrentQuery();
    const { id: paramsId } = useParams<{ id: string }>();
    const userId = data?.id;

    if (isLoading) {
        return <Spinner />;
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
                {
                    userId !== paramsId &&
                    <div className="flex-2 p-4">
                        <Profile />
                    </div>
                }
            </Container>
        </>
    );
}

export default Layout;