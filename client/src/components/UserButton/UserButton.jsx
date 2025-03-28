import { useState, useEffect, useRef } from "react";
import "./UserButton.css";
import Image from "../Image/Image";
import apiRequest from "../../utils/api-request";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const UserButton = () => {
    const navigate = useNavigate()
    const {currentUser,removeCurrentUser} = useAuthStore()
    const [open, setOpen] = useState(false);
    const ref = useRef();
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleToggle = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const handleLogout = async () => {
      try {
        await apiRequest.post("/users/auth/logout",{})
        removeCurrentUser()
        navigate("/auth")
      } catch (error) {
        console.error(error)
      }
    }

    return currentUser ? (
        <div className="user-button-container" ref={ref}>
            <div 
                className={`user-button ${open ? 'active' : ''}`} 
                onClick={handleToggle}
            >
                <Image src={currentUser.img || "/general/noAvatar.png"} alt="User Avatar" className="avatar" />
                <Image 
                    path="/general/arrow.svg" 
                    alt="Arrow Icon" 
                    className={`arrow ${open ? 'rotate' : ''}`} 
                />
            </div>
            
            {open && (
                <div className="user-options">
                    <div className="user-option" onClick={() => navigate(`/${currentUser.username}`)}>Profile</div>
                    <div className="user-option" onClick={() => navigate("/settings")}>Settings</div>
                    <div className="user-option" onClick={() => handleLogout()}>Logout</div>
                </div>
            )}
        </div>
    ) : (
        <Link to="/auth" className="login-link">
            Login / Sign Up
        </Link>
    );
};

export default UserButton;