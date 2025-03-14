import "./GalleryItem.css"

const GalleryItem = ({item}) => {
  return (
    <div className="gallery-item" style={{gridRowEnd:`span ${Math.ceil(item.height/100)}`}}>
        <img src={item.media} alt="images"  />
    </div>
  )
}

export default GalleryItem