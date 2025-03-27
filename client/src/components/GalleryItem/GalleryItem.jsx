import "./GalleryItem.css"
import { Link } from 'react-router'
import Image from "../Image/Image"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"


const GalleryItem = ({ item }) => {
  const queryClient = useQueryClient()
  const optimizedHeight = (372 * item.height) / item.width

  const { data: interactionData } = useQuery({
    queryKey: ["interactionCheck", item._id],
    queryFn: async () => {
      const res = await apiRequest.get(`/pins/interaction-check/${item._id}`)
      return res.data
    },
    initialData: { isSaved: false } 
  })

  const { mutate: savePin } = useMutation({
    mutationFn: async () => {
      await apiRequest.post(`/pins/interact/${item._id}`, { type: 'save' })
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["interactionCheck", item._id])

      const previousData = queryClient.getQueryData(["interactionCheck", item._id])

      queryClient.setQueryData(["interactionCheck", item._id], old => ({
        ...old,
        isSaved: !old.isSaved
      }))

      return { previousData }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["interactionCheck", item._id], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["interactionCheck", item._id])
    }
  })

  return (
    <div
      className="gallery-item"
      style={{ gridRowEnd: `span ${Math.max(1, Math.ceil(item.height / 100))}` }}
    >
      <Image
        path={item.media.startsWith("https") ? undefined : item.media}
        src={item.media.startsWith("https") ? item.media : undefined}
        alt=""
        width={372}
        height={optimizedHeight}
      />

      <Link to={`/pin/${item._id}`} className="overlay"></Link>
      
      <button 
        className={`save-button ${interactionData?.isSaved ? 'saved' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          savePin()
        }}
      >
        {interactionData?.isSaved ? "Saved" : "Save"}
      </button>
      
      <div className="overlay-icons">
        <button>
          <Image path="/general/share.svg" alt="Share" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="More" />
        </button>
      </div>
    </div>
  )
}

export default GalleryItem
