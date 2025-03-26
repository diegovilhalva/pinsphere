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
        <>
            {
                boards.length > 0 ? (
                    <div className="collections">
                        {boards?.map((board) => (
                            <Link to={`/search?boardId=${board._id}`} className="collection" key={board._id}>
                                <Image
                                    path={board.firstPin.media.startsWith("https") ? undefined : board.firstPin.media}
                                    src={board.firstPin.media.startsWith("https") ? board.firstPin.media : undefined}
                                    alt={board.title}
                                />
                                <div className="collection-info">
                                    <h1>{board.title}</h1>
                                    <span>{board.pinCount !== 1 ? `${board.pinCount} pins` : `${board.pinCount} pin`} - {format(board.createdAt)}

                                    </span>
                                </div>
                            </Link>
                        ))}


                    </div>
                ) : (
                    <>
                        <p className="zero-results">The user has no collections</p>
                    </>
                )}
        </>
    )
}

export default Boards