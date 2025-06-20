import "../styles/Dashboard.css";
import AuthService from "../services/authenticationService";
import { useAuth } from "../services/authContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
    { tabName: "Calendar", active: true },
    { tabName: "Tasks", active: false },
    { tabName: "Grades", active: false },
    { tabName: "Pomodoro", active: false },
    { tabName: "Friends", active: false },
];

export default function Dashboard(props) {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Get the name of the user
    const userName = user?.user_metadata?.name || user?.email || "Guest";

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <>
            {/*Main div (100vh 100vw)*/}
            <div className="page-container">
                {/* Left side content */}
                <div className="page-sidebar">
                    {/* Sidebar Profile Pic and Name*/}
                    <div className="profile">
                        <div className="profile-picture"></div>
                        <a className="profile-name">{userName}</a>
                    </div>
                    {/* Sidebar Other tabs*/}
                    <div className="sidebar-tabs">
                        {/* TODO: ADD LINK TO a */}
                        {sidebarItems.map((item) => (
                            <a
                                key={item.tabName}
                                className={`new-tab ${item.active && "active"}`}
                            >
                                {item.tabName}
                            </a>
                        ))}
                    </div>
                </div>  {/* End of left sidebar div */}

                {/* Right side content */}
                <div className="main-page">
                    {/* Top Header */}
                    <div className="page-header">
                    {/* Logout button */}
                    <span className="header-action"> <Button variant="contained" onClick={handleLogout}>Logout</Button></span>
                        <span className="header-action">ADD EVENT</span>
                        <span className="header-action">IMPORT</span>
                        <span className="header-action">EXPORT</span>
                    </div>

                    {/* Main Content */}
                    <div class="main-content">
                        {props.component}
                    </div>

                </div>
            </div>
        </>
    );
}