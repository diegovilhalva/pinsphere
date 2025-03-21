import Comment from "../models/comment.model.js"

export const getPostComments = async (req, res) => {

    try {
        const postId = req.params.postId

        const comments = await Comment.find({ pin: postId }).populate("user","username img displayName").sort({createdAt:-1})
        
        res.status(200).json({ success: true, data: comments })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch comments'
        });
    }
}