import Image from "../Image/Image"
import { format } from "timeago.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"
import useAuthStore from "../../utils/authStore" 

const Comment = ({ comment, postId }) => {
  const queryClient = useQueryClient()
  const { currentUser } = useAuthStore() // Use o zustand store

  
  const deleteMutation = useMutation({
    mutationFn: async (commentId) => {
      await apiRequest.delete(`/comments/${commentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
    },
    onError: (error) => {
      console.error("Delete error:", error)
    }
  })

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteMutation.mutate(comment._id)
    }
  }

  return (
    <div className="comment">
      <Image 
        src={comment.user.img || "/general/noAvatar.png"} 
        alt={comment.user.displayName} 
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-username">{comment.user.displayName}</span>
          {currentUser?._id === comment.user._id.toString() && (
            <button
              className="delete-button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
        <p className="comment-text">{comment.description}</p>
        <div className="comment-time">{format(comment.createdAt)}</div>
      </div>
    </div>
  )
}

export default Comment