import { useAppSelector } from "../app/hooks";
import Layout from "../components/Layout";
import { selectIsAuthenticated } from "./userSlice";
import { Navigate } from "react-router-dom";

const AuthGuard = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    return <Layout />;
}

export default AuthGuard;