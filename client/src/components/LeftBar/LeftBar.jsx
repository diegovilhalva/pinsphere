import { Link } from "react-router";
import Image from "../Image/Image";
import "./LeftBar.css";

const LeftBar = () => {
    return (
        <div className="leftbar">
            <div className="menu-icons">
                <Link to="/" className="menu-icon" >
                    <Image path="/general/logo.png" alt="PinSphere Logo" className="logo"/>
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
                <Link to="/" className="menu-icon">
                    <Image path="/general/settings.svg" alt="Settings" />
                </Link>
        </div>
    );
};

export default LeftBar;
