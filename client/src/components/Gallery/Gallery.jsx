import GalleryItem from "../GalleryItem/GalleryItem";
import "./Gallery.css"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import InfiteScroll from "react-infinite-scroll-component"
const Gallery = () => {

  const fetchPins = async ({ pageParam = 0 }) => {
    const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/pins`, {
      params: { cursor: pageParam }
    });
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
    error
  } = useInfiniteQuery({
    queryKey: ['pins'],
    queryFn: fetchPins,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allPins = data?.pages.flatMap(page => page.data) || [];

  if (status === "pending") return <div className="loading">Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;
  return (
    <InfiteScroll dataLength={allPins.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={<h3>Loading more posts</h3>} endMessage={<h3>All pins loaded</h3>}>
      <div className="gallery">
        {allPins.map(item => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiteScroll>

  )
}

export default Gallery