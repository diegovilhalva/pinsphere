import "./Comments.css"
import Image from "../Image/Image"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"
import Comment from "./Comment"
const Comments = ({ id }) => {

  const [open, setOpen] = useState(false)
  const { data, isPending, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
  })


  if (isPending) return "Loading..."
  if (error) return "An error has occurred"
  if (!data) return "User not found"
  const comments = data.data
  console.log(comments)
  return (
    <div className="comments">
      <div className="comment-list">
        <span className="comment-number">
          {comments.length === 0
            ? "No comments"
            : `${comments.length} comment${comments.length !== 1 ? 's' : ''}`
          }
        </span>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}

      </div>
      <form className="comment-form">
        <input type="text" placeholder="Add a  comment" />
        <div className="emoji">
          <div onClick={() => setOpen((prev) => !prev)}>😊</div>
          {open && (
            <div className="emoji-picker">
              <EmojiPicker className="emoji-picker-container" />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Comments