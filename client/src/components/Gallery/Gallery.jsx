import GalleryItem from "../GalleryItem/GalleryItem";
import "./Gallery.css"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const Gallery = () => {

  const fetchPins = async() => {
    const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/pins`)
    return res.data.data
  }

  const {isPending,error,data} = useQuery({queryKey:['pins'],queryFn:fetchPins})
  if (error) return "An error has occurred: " + error.message
  if (isPending) return <p>Loading...</p>;
  console.log(error)
  return (
    <div className="gallery">
        {data.map(item => (
            <GalleryItem key={item._id} item={item} />
        ))}
    </div>
  )
}

export default Gallery