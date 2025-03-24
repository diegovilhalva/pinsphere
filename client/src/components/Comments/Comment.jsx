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
                            {deleteMutation.isPending ? "Deleting..." : (<svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                            </svg>)}
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