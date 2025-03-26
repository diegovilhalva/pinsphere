import "./GalleryItem.css"
import { Link } from 'react-router'
import Image from "../Image/Image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiRequest from "../../utils/api-request"

const GalleryItem = ({ item }) => {
  const queryClient = useQueryClient()
  const optimizedHeight = (372 * item.height) / item.width

  // Mutação para salvar/remover save
  const { mutate: savePin } = useMutation({
    mutationFn: async () => {
      await apiRequest.post(`/pins/interact/${item._id}`, { type: 'save' })
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['pins'])
      
      const previousPins = queryClient.getQueryData(['pins'])
      
      queryClient.setQueryData(['pins'], old => 
        old.map(pin => 
          pin._id === item._id 
            ? { ...pin, isSaved: !pin.isSaved } 
            : pin
        )
      )
      
      return { previousPins }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['pins'], context.previousPins)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['pins'])
      queryClient.invalidateQueries(['interactionCheck', item._id])
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
        className={`save-button ${item.isSaved ? 'saved' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          savePin()
        }}
      >
        {item.isSaved ? "Saved" : "Save"}
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