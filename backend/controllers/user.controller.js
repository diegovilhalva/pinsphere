
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    try {
        const { displayName, username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            displayName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            hashedPassword
        })

        await user.save()

        const userResponse = {
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            img: user.img,
            createdAt: user.createdAt,
        };

        res.status(201).json({
            success: true,
            data: userResponse
        })
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                error: `${field} is already registered`
            });
        }
        console.log(error)


        res.status(500).json({
            success: false,
            error: 'Registration failed. Please try again.'
        });
    }
}