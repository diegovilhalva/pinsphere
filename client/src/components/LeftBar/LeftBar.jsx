import "./LeftBar.css";

const LeftBar = () => {
    return (
        <div className="leftbar">
            <div className="menu-icons">
                <a href="/" className="menu-icon" >
                    <img src="/general/logo.png" alt="PinSphere Logo" className="logo"/>
                </a>
                <a href="/" className="menu-icon active">
                    <img src="/general/home.svg" alt="Home" />
                </a>
                <a href="/" className="menu-icon">
                    <img src="/general/create.svg" alt="Create" />
                </a>
                <a href="/" className="menu-icon">
                    <img src="/general/updates.svg" alt="Updates" />
                </a>
                <a href="/" className="menu-icon">
                    <img src="/general/messages.svg" alt="Messages" />
                </a>
            </div>
                <a href="/" className="menu-icon">
                    <img src="/general/settings.svg" alt="Settings" />
                </a>
        </div>
    );
};

export default LeftBar;
