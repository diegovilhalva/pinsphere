import "./Comments.css"
import Image from "../Image/Image"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
const Comments = () => {

  const [open, setOpen] = useState(false)
  return (
    <div className="comments">
      <div className="comment-list">
        <span className="comment-number">+5 Comments</span>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="profile picture" />
          <div className="comment-content">
            <span className="comment-username">John Doe</span>
            <p className="comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="comment-time">1h</div>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="profile picture" />
          <div className="comment-content">
            <span className="comment-username">John Doe</span>
            <p className="comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="comment-time">1h</div>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="profile picture" />
          <div className="comment-content">
            <span className="comment-username">John Doe</span>
            <p className="comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="comment-time">1h</div>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="profile picture" />
          <div className="comment-content">
            <span className="comment-username">John Doe</span>
            <p className="comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="comment-time">1h</div>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="profile picture" />
          <div className="comment-content">
            <span className="comment-username">John Doe</span>
            <p className="comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="comment-time">1h</div>
          </div>
        </div>
      </div>
      <form className="comment-form">
        <input type="text" placeholder="Add a  comment" />
        <div className="emoji">
          <div onClick={() => setOpen((prev) => !prev)}>😊</div>
          {open && (
            <div className="emoji-picker">
              <EmojiPicker className="emoji-picker-container"  />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Comments