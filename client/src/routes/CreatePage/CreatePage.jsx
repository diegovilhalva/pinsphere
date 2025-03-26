import IKImage from "../../components/Image/Image"
import "./CreatePage.css"
import useAuthStore from "../../utils/authStore"
import { useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"
import Editor from "../../components/Editor/Editor"
import useEditorStore from "../../utils/editorStore"
import apiRequest from "../../utils/api-request"
import { useMutation, useQuery } from "@tanstack/react-query"
import BoardForm from "./BoardForm"
const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data.data
};

const CreatePage = () => {
  const { currentUser } = useAuthStore()
  const { textOptions, canvasOptions, resetStore } = useEditorStore()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const formRef = useRef()
  const [previewImage, setPreviewImage] = useState({
    url: "",
    width: 0,
    height: 0
  })
  const [isEditing, setIsEditing] = useState(false)
  const [newBoard, setNewBoard] = useState("")
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false)
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

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore()
      navigate(`/pin/${data._id}`)
    }
  })

  const handleSubmit = (e) => {
    if (isEditing) {
      setIsEditing(false)
    } else {
      const formData = new FormData(formRef.current)
      formData.append("media", file)
      formData.append("textOptions", JSON.stringify(textOptions))
      formData.append('canvasOptions', JSON.stringify(canvasOptions))
      formData.append("newBoard", newBoard)
      mutation.mutate(formData)
    }
  }

  const { data, isPending, error } = useQuery({
    queryKey: ["formBoards"],
    queryFn: () => apiRequest.get(`/boards`).then((res) => res.data),
  });


  const handleNewBoard = () => {
    setIsNewBoardOpen((prev) => !prev);
  };

  return (
    <div className="create-page">
      <div className="create-top">
        <h1>{isEditing ? 'Design your pin' : 'Create Pin'} </h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
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
          <form className="create-form" ref={formRef}>
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
            {(!isPending || !error) && (
              <div className="create-form-item">
                <label htmlFor="board">Board</label>
                <select name="board" id="board">
                  <option value="">Choose a board</option>
                  {data?.map((board) => (
                    <option value={board._id} key={board._id}>
                      {board.title}
                    </option>
                  ))}
                </select>
                <div className="new-board">
                  {newBoard && (
                    <div className="new-board-container">
                      <div className="new-board-item">{newBoard}</div>
                    </div>
                  )}
                  <div className="create-board-icon" onClick={handleNewBoard}>
                    Create new board
                  </div>
                </div>
              </div>
            )}
            <div className="create-form-item">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Don&apos;t worry, people won&apos;t see your tags</small>
            </div>
          </form>
          {isNewBoardOpen && (
            <BoardForm
              setIsNewBoardOpen={setIsNewBoardOpen}
              setNewBoard={setNewBoard}
            />
          )}
        </div>)}
    </div>
  )
}

export default CreatePage