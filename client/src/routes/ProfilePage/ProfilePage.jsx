import "./ProfilePage.css"
import Image from "../../components/Image/Image"
import { useState } from "react"
import Boards from "../../components/Boards/Boards"
import Gallery from "../../components/Gallery/Gallery"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"
import { useParams } from "react-router"
const ProfilePage = () => {
  const [type, setType] = useState("saved")
  const { username } = useParams()
  const { data, isPending, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  })

  if (isPending) return "Loading..."
  if (error) return "An error has occurred"
  if (!data) return "User not found"
  const profile = data.data

  return (
    <div className="profile-page">
      <Image src={profile.img || "/general/noAvatar.png"} className="profile-img" alt={profile.displayName} />
      <h1 className="profile-name">{profile.displayName}</h1>
      <span className="profile-username">@{profile.username}</span>
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
        <span className={type === "created" ? "active " : ""} onClick={() => setType("created")}>
          Created
        </span>
        <span className={type === "saved" ? "active " : ""} onClick={() => setType("saved")}>
          Saved
        </span>
      </div>
      {type === "created" ? <Gallery userId={profile._id} /> : <Boards userId={profile._id} />}
    </div>
  )
}

export default ProfilePage