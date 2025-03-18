import Image from "../../components/Image/Image"
import "./CreatePage.css"
const CreatePage = () => {
  return (
    <div className="create-page">
      <div className="create-top">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="create-bottom">
        <div className="upload">
          <div className="upload-title">
            <Image path="/general/upload.svg" alt="Upload" />
            <span>Choose a file</span>
          </div>
          <div className="upload-info">
            We recommend using high quality .jpg files less than 20 MB or
            .mp4 files less than 200 MB.
          </div>
        </div>
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
      </div>
    </div>
  )
}

export default CreatePage