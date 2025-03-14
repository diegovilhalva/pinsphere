import { useState, useEffect, useRef } from "react";
import "./UserButton.css";

const UserButton = () => {
    const currentUser = true;
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

    return currentUser ? (
        <div className="user-button-container" ref={ref}>
            <div 
                className={`user-button ${open ? 'active' : ''}`} 
                onClick={handleToggle}
            >
                <img src="/general/noAvatar.png" alt="User Avatar" className="avatar" />
                <img 
                    src="/general/arrow.svg" 
                    alt="Arrow Icon" 
                    className={`arrow ${open ? 'rotate' : ''}`} 
                />
            </div>
            
            {open && (
                <div className="user-options">
                    <div className="user-option" onClick={() => console.log('Profile')}>Profile</div>
                    <div className="user-option" onClick={() => console.log('Settings')}>Settings</div>
                    <div className="user-option" onClick={() => console.log('Logout')}>Logout</div>
                </div>
            )}
        </div>
    ) : (
        <a href="/" className="login-link">
            Login or Sign Up
        </a>
    );
};

export default UserButton;