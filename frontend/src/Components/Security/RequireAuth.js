import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = ({ allowedRoles }) => {
    const user = Cookies.get("username");
    const role = Cookies.get("role").toString().toLowerCase(); 
    const location = useLocation();
    return (
        allowedRoles?.find( allowedRole => allowedRole === role )
            ? <Outlet />
            : user
                ? <Navigate to="/mndpt/unauthorized"  state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default RequireAuth;