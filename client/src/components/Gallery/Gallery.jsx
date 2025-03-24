import GalleryItem from "../GalleryItem/GalleryItem";
import "./Gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import apiRequest from "../../utils/api-request";

const Gallery = ({ search, userId, boardId }) => {
  const fetchPins = async ({ pageParam = 0 }) => {
    const res = await apiRequest.get(`${import.meta.env.VITE_API_ENDPOINT}/pins`, {
      params: {
        cursor: pageParam,
        search: search || undefined,
        userId: userId || undefined,
        boardId: boardId || undefined
      }
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
    queryKey: ['pins', search, userId, boardId],
    queryFn: fetchPins,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allPins = data?.pages.flatMap(page => page.data) || [];

  if (status === "pending") return <div className="loading">Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;
  const noResults = data?.pages[0]?.data?.length === 0 && !hasNextPage;
  return (
    <>
      {noResults  ? (
        <div className="no-results">
          <h3>No pin founded for "{search}"</h3>
          <p>Try another search term</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={allPins.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
          endMessage={<h3 className="end-message">All pins loaded</h3>}
        >
          <div className="gallery">
            {allPins.map(item => (
              <GalleryItem key={item._id} item={item} />
            ))}
          </div>
        </InfiniteScroll >
      )}
    </>
  );
};

export default Gallery;