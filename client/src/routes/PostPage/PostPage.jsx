import "./PostPage.css"
import Image from "../../components/Image/Image"
import PostInteractions from "../../components/PostInteractions/PostInteractions"
import { Link, useParams } from "react-router"
import Comments from "../../components/Comments/Comments"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"

const PostPage = () => {

  const { id } = useParams()

  const { data, isPending, error } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  })

  if(isPending) return "Loading..."
  if (error) return "An error has occurred"
  if(!data) return "Pin not found"
  const pin = data.data
  
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
          <Image path={pin.media.startsWith("https") ? undefined : pin.media} 
          src={pin.media.startsWith("https") ? pin.media: undefined} alt={pin.description} width={736} />
        </div>
        <div className="post-details">
          <PostInteractions postId={id} />
          <Link to={`/${pin.user.username}`} className="post-user">
            <Image src={pin.user.img || "/general/noAvatar.png"} alt="profile picture" />
            <span className="">{pin.user.displayName}</span>
          </Link>
          <Comments id={pin._id} />
        </div>
      </div>
    </div>
  )
}

export default PostPage