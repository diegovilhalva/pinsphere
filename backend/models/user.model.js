import mongoose from "mongoose"
import { Schema } from "mongoose"

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true
    },
    img: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    imgFileId: String,
    imgDimensions: {
        width: Number,
        height: Number
    },
    hashedPassword: {
        type: String,
        required: true
    }
}, { timestamps: true })


export default mongoose.model("User", userSchema)