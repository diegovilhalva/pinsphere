import IKImage from "../../components/Image/Image"
import "./CreatePage.css"
import useAuthStore from "../../utils/authStore"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import Editor from "../../components/Editor/Editor"
const CreatePage = () => {
  const { currentUser } = useAuthStore()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState({
    url: "",
    width: 0,
    height: 0
  })
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth")
    }
  }, [navigate, currentUser])

  useEffect(() => {
    if (file) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        setPreviewImage({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height
        })
      }
    }
  }, [file])
  return (
    <div className="create-page">
      <div className="create-top">
        <h1>{isEditing ? 'Design your pin' : 'Create Pin'}</h1>
        <button>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {isEditing ? <Editor previewImg={previewImage} /> : (
        <div className="create-bottom">
          {previewImage.url ? <div className="preview">
            <img src={previewImage.url} alt="" />
            <div className="edit-icon" onClick={() => setIsEditing(true)}>
              <IKImage path="/general/edit.svg" />
            </div>
          </div> : (<>
            <label htmlFor="file" className="upload">
              <div className="upload-title">
                <IKImage path="/general/upload.svg" alt="Upload" />
                <span>Choose a file</span>
              </div>
              <div className="upload-info">
                We recommend using high quality .jpg files less than 20 MB or
                .mp4 files less than 200 MB.
              </div>
            </label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} hidden />
          </>)
          }
          <form className="create-form">
            <div className="create-form-item">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" placeholder="Add a title" />
            </div>
            <div className="create-form-item">
              <label htmlFor="description">Description</label>
              <textarea rows={6} type="text" placeholder="Add a detailed description" name="description" id="description"></textarea>
            </div>
            <div className="create-form-item">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                placeholder="Add a link"
                name="link"
                id="link"
              />
            </div>
            <div className="create-form-item">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option value="">Choose a board</option>
                <option value="1">Board 1</option>
                <option value="2">Board 2</option>
                <option value="3">Board 3</option>
              </select>
            </div>
            <div className="create-form-item">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Don&apos;t worry, people won&apos;t see your tags</small>
            </div>
          </form>
        </div>)}
    </div>
  )
}

export default CreatePage