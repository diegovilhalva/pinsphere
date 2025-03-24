import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import apiRequest from '../../utils/api-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const addComent = async (comment) => {
  const res = await apiRequest.post("/comments",comment)
  return res.data.data
}

const CommentsForm = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")

  const handleEmojiClick = (emoji) => {
    setDescription(prev => prev + " " + emoji.emoji)
    setOpen(false)
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:addComent,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:["comments",id]})
      setDescription("")
      setOpen(false)
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description.trim()) {
      return 
    }
    mutation.mutate({
      description:description,
      pin:id
    })
    
  }
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Add a  comment" onChange={(e) => setDescription(e.target.value)} value={description} />
      <div className="emoji">
        <div onClick={() => setOpen((prev) => !prev)}>😊</div>
        {open && (
          <div className="emoji-picker">
            <EmojiPicker className="emoji-picker-container" onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  )
}

export default CommentsForm