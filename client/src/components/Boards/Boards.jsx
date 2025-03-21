import Image from "../Image/Image"
import "./Boards.css"

const Boards = () => {
  return (
    <div className="collections">
        <div className="collection">
            <Image path="/pins/pin1.jpeg" alt="My pin" />
            <div className="collection-info">
                <h1>Minamalist Badrooms</h1>
                <span>12 pins - 1w</span>
            </div>
        </div>
        <div className="collection">
            <Image path="/pins/pin2.jpeg" alt="My pin" />
            <div className="collection-info">
                <h1>Minamalist Badrooms</h1>
                <span>12 pins - 1w</span>
            </div>
        </div>
        <div className="collection">
            <Image path="/pins/pin3.jpeg" alt="My pin" />
            <div className="collection-info">
                <h1>Minamalist Badrooms</h1>
                <span>12 pins - 1w</span>
            </div>
        </div>
        
    </div>
  )
}

export default Boards