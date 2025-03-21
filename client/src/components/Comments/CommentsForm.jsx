import EmojiPicker from 'emoji-picker-react'
import  { useState } from 'react'

const CommentsForm = () => {
    const [open, setOpen] = useState(false)
  return (
    <form className="comment-form">
    <input type="text" placeholder="Add a  comment" />
    <div className="emoji">
      <div onClick={() => setOpen((prev) => !prev)}>😊</div>
      {open && (
        <div className="emoji-picker">
          <EmojiPicker className="emoji-picker-container" />
        </div>
      )}
    </div>
  </form>
  )
}

export default CommentsForm