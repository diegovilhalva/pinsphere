import Pin from "../models/pin.model.js"


export const getPins = async (req, res) => {
    try {
        const limit = 21;
        const cursor = parseInt(req.query.cursor) || 0;

        const pins = await Pin.find()
            .sort({ createdAt: -1 })
            .skip(cursor * limit)
            .limit(limit + 1);

        const hasNextPage = pins.length > limit;
        const results = hasNextPage ? pins.slice(0, -1) : pins;

        await new Promise(resolve => setTimeout(resolve, 3000))
        res.status(200).json({
            success: true,
            data: results,
            nextCursor: hasNextPage ? cursor + 1 : null
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pins'
        });
    }
}