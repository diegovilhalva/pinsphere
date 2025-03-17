import Image from "../Image/Image"
import "./PostInteractions.css"

const PostInteractions = () => {
    return (
        <div className="post-interactions">
            <div className="interaction-icons">
                <Image path="/general/react.svg" alt="Likes" />
                273
                <Image path="/general/share.svg" alt="Share" />
                <Image path="/general/more.svg" alt="More" />
            </div>
            <button>Save</button>
        </div>
    )
}

export default PostInteractions