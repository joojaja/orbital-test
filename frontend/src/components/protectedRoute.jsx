import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/authenticationService";
import { useAuth } from "../services/authContext";

// This component is used to protect routes that require authentication
function ProtectedRoute() {
    // Check if the user is authenticated, if the token is stored in localStorage
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/" state={{ message: "You must be logged in to view this page." }} />;
    }

    // Render the child components if the user is authenticated
    return <Outlet />; 
}

export default ProtectedRoute;