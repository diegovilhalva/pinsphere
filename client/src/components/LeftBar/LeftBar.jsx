import Image from "../Image/Image";
import "./LeftBar.css";

const LeftBar = () => {
    return (
        <div className="leftbar">
            <div className="menu-icons">
                <a href="/" className="menu-icon" >
                    <Image path="/general/logo.png" alt="PinSphere Logo" className="logo"/>
                </a>
                <a href="/" className="menu-icon active">
                    <Image path="/general/home.svg" alt="Home" />
                </a>
                <a href="/" className="menu-icon">
                    <Image path="/general/create.svg" alt="Create" />
                </a>
                <a href="/" className="menu-icon">
                    <Image path="/general/updates.svg" alt="Updates" />
                </a>
                <a href="/" className="menu-icon">
                    <Image path="/general/messages.svg" alt="Messages" />
                </a>
            </div>
                <a href="/" className="menu-icon">
                    <Image path="/general/settings.svg" alt="Settings" />
                </a>
        </div>
    );
};

export default LeftBar;
