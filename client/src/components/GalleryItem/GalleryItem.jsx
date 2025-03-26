import "./GalleryItem.css"
import { Link } from 'react-router'
import Image from "../Image/Image";

const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width

  return (
    <div
      className="gallery-item"
      style={{ gridRowEnd: `span ${Math.max(1, Math.ceil(item.height / 100))}` }}
    >
      {/*<img src={item.media} alt="Pin" />*/}
      <Image
        path={item.media.startsWith("https") ? undefined : item.media}
        src={item.media.startsWith("https") ? item.media : undefined}
        alt=""
        width={372}
        height={optimizedHeight}
      />

      <Link to={`/pin/${item._id}`} className="overlay"></Link>
      <button className="save-button">Save</button>
      <div className="overlay-icons">
        <button>
          <Image path="/general/share.svg" alt="Share" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="More" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;