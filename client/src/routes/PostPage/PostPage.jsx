import "./PostPage.css"
import Image from "../../components/Image/Image"
import PostInteractions from "../../components/PostInteractions/PostInteractions"
import { Link } from "react-router"
import Comments from "../../components/Comments/Comments"


const PostPage = () => {
  return (
    <div className="post-page">
     <svg
        height="20"
        viewBox="0 0 24 24"
        width="20"
        className="back-icon"
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
      <div className="post-container">
        <div className="post-img">
          <Image path="/pins/pin1.jpeg" alt="post image" width={736} />
        </div>
        <div className="post-details">
          <PostInteractions />
          <Link to="/profile" className="post-user">
            <Image path="/general/noAvatar.png" alt="profile picture" />
            <span className="">John Doe</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  )
}

export default PostPage