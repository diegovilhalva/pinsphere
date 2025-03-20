import Pin from "../models/pin.model.js"


export const getPins = async (req, res) => {
    try {
        const pins = await Pin.find()
        res.status(200).json({ success: true, data: pins })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pins'
        });
    }
}