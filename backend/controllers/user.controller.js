
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const getUser = async (req, res) => {
    try {
        const { username } = req.params

        const user = await User.findOne({ username }).select('-hashedPassword -__v')

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email,
                img: user.img,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error('Get User Error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching user data'
        });
    }


}

export const registerUser = async (req, res) => {
    try {
        const { displayName, username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            displayName: displayName.trim(),
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            hashedPassword
        })

        await user.save()

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secrure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
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
                errors: [{
                    field,
                    message: `${field} is already registered`
                }]
            });
        }
        console.log(error)


        res.status(500).json({
            success: false,
            error: 'Registration failed. Please try again.'
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                errors: [{
                    field: !identifier ? 'identifier' : 'password',
                    message: 'Required field'
                }]
            });
        }

        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase().trim() },
                { username: identifier.toLowerCase().trim() }
            ]
        }).select('+hashedPassword')

        if (!user) {
            return res.status(401).json({
                success: false,
                errors: [{
                    field: 'general',
                    message: 'Invalid credentials'
                }]
            });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                errors: [{
                    field: 'general',
                    message: 'Invalid credentials'
                }]
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secrure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        const userResponse = {
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            img: user.img,
            createdAt: user.createdAt
        };

        res.status(200).json({
            success: true,
            data: userResponse
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            errors: [{
                field: 'general',
                message: 'Server error. Please try again.'
            }]
        });
    }
}


export const logoutUser = async (req, res) => {

}
