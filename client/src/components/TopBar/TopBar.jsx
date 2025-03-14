import UserButton from "../UserButton/UserButton";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="search">
        <img src="/general/search.svg" alt="Search Icon" />
        <input type="search" placeholder="Search..." />
      </div>
      <UserButton />
    </div>
  );
};

export default TopBar;
