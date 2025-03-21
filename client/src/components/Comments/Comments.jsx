import "./Comments.css"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"
import Comment from "./Comment"
import CommentsForm from "./CommentsForm"
const Comments = ({ id }) => {

  
  const { data, isPending, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
  })


  if (isPending) return "Loading..."
  if (error) return "An error has occurred"
  if (!data) return "User not found"
  const comments = data.data

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
     <CommentsForm />
    </div>
  )
}

export default Comments