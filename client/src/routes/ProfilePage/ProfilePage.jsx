import "./ProfilePage.css"
import Image from "../../components/Image/Image"
import { useState } from "react"
import Collections from "../../components/Collections/Collections"
import Gallery from "../../components/Gallery/Gallery"
const ProfilePage = () => {
  const [type, setType] = useState("saved")
  return (
    <div className="profile-page">
      <Image path="/general/noAvatar.png" className="profile-img" alt='Profile picture' />
      <h1 className="profile-name">John Doe</h1>
      <span className="profile-username">@jhondoe</span>
      <div className="follow-counts"> 10 Followers - 20 Following</div>
      <div className="profile-interactions">
        <Image path="/general/share.svg" alt="Share" />
        <div className="profile-buttons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <Image path="/general/more.svg" alt="" />
      </div>
      <div className="profile-options">
        <span className={type === "created" ? "active " : ""} onClick={() => setType("created")}>Created</span>
        <span className={type === "saved" ? "active " : ""} onClick={() => setType("saved")}>Saved</span>
      </div>
      {type === "created" ? <Gallery/> : <Collections/>}
    </div>
  )
}

export default ProfilePage