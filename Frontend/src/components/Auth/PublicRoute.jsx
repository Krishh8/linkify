import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    console.log("isAuth : ", isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to="/user/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
