import Pin from "../models/pin.model.js";
import mongoose from "mongoose"

export const getPins = async (req, res) => {
    try {
        const limit = 21;
        const cursor = parseInt(req.query.cursor) || 0;
        const search = req.query.search;
        const userId = req.query.userId
        const boardId = req.query.boardId
        const query = {};

        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid user ID format'
                });
            }
            query.user = userId;
        }
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: { $regex: searchRegex } },
                { tags: { $in: [searchRegex] } }
            ];
        }

        if (boardId) {
            query.board = boardId
        }
        

        const pins = await Pin.find(query)
            .sort({ createdAt: -1 })
            .skip(cursor * limit)
            .limit(limit + 1);

        const hasNextPage = pins.length > limit;
        const results = hasNextPage ? pins.slice(0, -1) : pins;


        if (process.env.NODE_ENV === 'development') {
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        res.status(200).json({
            success: true,
            data: results,
            nextCursor: hasNextPage ? cursor + 1 : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pins'
        });
    }
};

export const getPin = async (req, res) => {
    try {
        const { id } = req.params

        const pin = await Pin.findById(id).populate("user", "username img displayName")

        res.status(200).json({ success: true, data: pin })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pin'
        })
    }
}