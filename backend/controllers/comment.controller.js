import Comment from "../models/comment.model.js"
import jwt from "jsonwebtoken"
export const getPostComments = async (req, res) => {

    try {
        const postId = req.params.postId

        const comments = await Comment.find({ pin: postId }).populate("user", "username img displayName").sort({ createdAt: -1 })

        res.status(200).json({ success: true, data: comments })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch comments'
        });
    }

}
export const addComment = async (req, res) => {
    try {
        const { description, pin } = req.body

        const userId = req.userId

        const comment = await Comment.create({ description, pin, user: userId })

        res.status(201).json({ success: true, data: comment })
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            success: false,
            error: 'Failed to create comment'
        });
    }
}

export const deleteComment = async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.postId)
        
        if (!comment) {
          return res.status(404).json({ 
            success: false, 
            error: "Comment not found" 
          })
        }
    
        
        if (comment.user.toString() !== req.userId) {
          return res.status(403).json({ 
            success: false, 
            error: "Not authorized to delete this comment" 
          })
        }
    
        await Comment.findByIdAndDelete(req.params.postId)
        res.status(200).json({ 
          success: true, 
          message: "Comment deleted successfully" 
        })
        
      } catch (error) {
        console.error("Delete comment error:", error)
        res.status(500).json({ 
          success: false, 
          error: "Internal server error" 
        })
      }
}