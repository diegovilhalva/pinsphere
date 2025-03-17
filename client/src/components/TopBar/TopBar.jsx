import Image from "../Image/Image";
import UserButton from "../UserButton/UserButton";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="search">
        <Image path="/general/search.svg" alt="Search Icon" />
        <input type="search" placeholder="Search..." />
      </div>
      <UserButton />
    </div>
  );
};

export default TopBar;
