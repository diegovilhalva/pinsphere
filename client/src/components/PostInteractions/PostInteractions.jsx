import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "../Image/Image"
import "./PostInteractions.css"
import apiRequest from "../../utils/api-request"

const PostInteractions = ({ postId }) => {
    const queryClient = useQueryClient()

    // Consulta interações
    const { data } = useQuery({
        queryKey: ["interactionCheck", postId],
        queryFn: async () => {
            const res = await apiRequest.get(`/pins/interaction-check/${postId}`)
            return res.data
        }
    })

    
    const mutation = useMutation({
        mutationFn: (type) => apiRequest.post(`/pins/interact/${postId}`, { type }),
        onMutate: async (type) => {
            await queryClient.cancelQueries(["interactionCheck", postId])
            const previousData = queryClient.getQueryData(["interactionCheck", postId])

            queryClient.setQueryData(["interactionCheck", postId], old => ({
                ...old,
                isLiked: type === 'like' ? !old.isLiked : old.isLiked,
                isSaved: type === 'save' ? !old.isSaved : old.isSaved,
                likeCount: type === 'like'
                    ? (old.isLiked ? old.likeCount - 1 : old.likeCount + 1)
                    : old.likeCount
            }))

            return { previousData }
        },
        onError: (err, type, context) => {
            queryClient.setQueryData(["interactionCheck", postId], context.previousData)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["interactionCheck", postId])
        }
    })
    console.log(data)
    return (
        <div className="post-interactions">
            <div className="interaction-icons">
                <div
                    className="like-container"
                    onClick={() => mutation.mutate('like')}
                >
                    <Image
                        path="/general/react.svg"
                        alt="Likes"
                        className={`like-icon ${data?.isLiked ? 'liked' : ''}`}
                    />
                    <span>{data?.likeCount || 0}</span>
                </div>

                <Image path="/general/share.svg" alt="Share" />
                <Image path="/general/more.svg" alt="More" />
            </div>
            <button
                onClick={() => mutation.mutate('save')}
            >
                {data?.isSaved ? "Saved" : "Save"}
            </button>
        </div>
    )
}

export default PostInteractions