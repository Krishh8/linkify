import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function PublicRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated) {
        return <Navigate to="/user/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;
