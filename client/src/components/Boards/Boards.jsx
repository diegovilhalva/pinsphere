import { useQuery } from "@tanstack/react-query"
import Image from "../Image/Image"
import "./Boards.css"
import apiRequest from "../../utils/api-request"
import { format } from "timeago.js"
import { Link } from "react-router"
const Boards = ({ userId }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ["boards", userId],
        queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
    })


    if (isPending) return "Loading..."
    if (error) return "An error has occurred"
    if (!data) return "User not found"
    const boards = data.data

    return (
        <div className="collections">
            {boards?.map((board) => (
                <Link to={`/search?boardId=${board._id}`} className="collection" key={board._id}>
                    <Image src={board.firstPin.media} alt={board.title} />
                    <div className="collection-info">
                        <h1>{board.title}</h1>
                        <span>{board.pinCount !== 1 ? `${board.pinCount} pins` : `${board.pinCount} pin`} - {format(board.createdAt)}

                        </span>
                    </div>
                </Link>
            ))}


        </div>
    )
}

export default Boards