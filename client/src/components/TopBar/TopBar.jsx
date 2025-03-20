import { useNavigate } from "react-router";
import Image from "../Image/Image";
import UserButton from "../UserButton/UserButton";
import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    navigate(`/search?search=${e.target[0].value}`)
  }
  return (
    <div className="topbar">
      <form className="search" onSubmit={handleSubmit}>
        <Image path="/general/search.svg" alt="Search Icon" />
        <input type="search" placeholder="Search..." />
      </form>
      <UserButton />
    </div>
  );
};

export default TopBar;
