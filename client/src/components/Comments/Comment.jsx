
import Image from "../Image/Image"
import {format} from  "timeago.js"

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <Image src={comment.user.img || "/general/noAvatar.png"} alt={comment.user.displayName} />
            <div className="comment-content">
                <span className="comment-username">{comment.user.displayName}</span>
                <p className="comment-text">{comment.description}</p>
                <div className="comment-time">{format(comment.createdAt)}</div>
            </div>
        </div>
    )
}

export default Comment