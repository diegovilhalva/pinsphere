import Image from "../../components/Image/Image"
import { useEffect } from "react"

const BoardForm = ({ setIsNewBoardOpen, setNewBoard }) => {
    
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setIsNewBoardOpen(false)
        }
    }

    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, []) 

    const handleSubmit = (e) => {
        e.preventDefault()
        const title = e.target[0].value
        setNewBoard(title)
        setIsNewBoardOpen(false)
    }

    return (
        <div className="board-form">
            <div className="board-form-container">
                <div className="board-form-close" onClick={() => setIsNewBoardOpen(false)}>
                    <Image path="/general/cancel.svg" alt="cancel" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Create a new board</h1>
                    <input 
                        type="text" 
                        placeholder="Board Title" 
                        autoFocus 
                    />
                    <button>Create</button>
                </form>
            </div>
        </div>
    )
}

export default BoardForm