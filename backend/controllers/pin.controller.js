import Pin from "../models/pin.model.js";

export const getPins = async (req, res) => {
    try {
        const limit = 21;
        const cursor = parseInt(req.query.cursor) || 0;
        const search = req.query.search;
        
        const query = {};
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: { $regex: searchRegex } },
                { tags: { $in: [searchRegex] } }
            ];
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