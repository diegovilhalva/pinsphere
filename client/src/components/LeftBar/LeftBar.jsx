import { Link } from "react-router";
import Image from "../Image/Image";
import "./LeftBar.css";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../utils/authStore";
import apiRequest from "../../utils/api-request";
import { useNavigate } from "react-router";

const LeftBar = () => {
    const navigate = useNavigate();
    const { currentUser, removeCurrentUser } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleLogout = async () => {
        try {
            await apiRequest.post("/users/auth/logout", {});
            removeCurrentUser();
            navigate("/auth");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="leftbar">
            <div className="menu-icons">
                <Link to="/" className="menu-icon">
                    <Image path="/general/logo.png" alt="PinSphere Logo" className="logo" />
                </Link>
                <Link to="/" className="menu-icon active">
                    <Image path="/general/home.svg" alt="Home" />
                </Link>
                <Link to="/create" className="menu-icon">
                    <Image path="/general/create.svg" alt="Create" />
                </Link>
                <Link to="/" className="menu-icon">
                    <Image path="/general/updates.svg" alt="Updates" />
                </Link>
                <Link to="/" className="menu-icon">
                    <Image path="/general/messages.svg" alt="Messages" />
                </Link>
            </div>

            <div className="bottom-icons" ref={menuRef}>
                {currentUser && (
                    <div 
                        className="menu-icon" 
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Image path="/general/settings.svg" alt="Settings" />
                    </div>
                )}

                {menuOpen && (
                    <div className="mobile-user-menu">
                        <div className="menu-item" onClick={() => navigate(`/${currentUser.username}`)}>
                            Profile
                        </div>
                        <div className="menu-item" onClick={() => navigate('/settings')}>
                            Settings
                        </div>
                        <div className="menu-item logout" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftBar;