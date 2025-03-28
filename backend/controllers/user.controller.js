
import User from "../models/user.model.js"
import Follow from "../models/follow.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sharp from "sharp"
import { uploadImage, deleteImage } from '../utils/imageKit.js'


export const getUser = async (req, res) => {
    try {
        const { username } = req.params

        const user = await User.findOne({ username }).select('-hashedPassword -__v')
        const followerCount = await Follow.countDocuments({ following: user._id })
        const followingCount = await Follow.countDocuments({ follower: user._id })
        const token = req.cookies.token;
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        if (!token) {
            res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email,
                    img: user.img,
                    followerCount,
                    followingCount,
                    isFollowing: false,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,

                }
            });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                if (!err) {
                    const isExists = await Follow.exists({
                        follower: payload.userId,
                        following: user._id,
                    });

                    res.status(200).json({
                        success: true,
                        data: {
                            _id: user._id,
                            displayName: user.displayName,
                            username: user.username,
                            email: user.email,
                            img: user.img,
                            followerCount,
                            followingCount,
                            isFollowing: isExists ? true : false,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,

                        }
                    });

                }
            })
        }



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
            secure: process.env.NODE_ENV === "production",
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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

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
    res.clearCookie("token")

    res.status(200).json({ success: true, message: "Logout successfully" })
}


export const followUser = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ username })
        const userId = req.userId

        const isFollowing = await Follow.exists({
            follower: userId,
            following: user._id
        })

        if (userId.toString() === user._id.toString()) {
            return res.status(400).json({
                success: false,
                error: "You cannot follow yourself"
            });
        }

        if (isFollowing) {
            await Follow.deleteOne({
                follower: userId,
                following: user._id
            })
        } else {
            await Follow.create({
                follower: userId,
                following: user._id
            })
        }
        res.status(201).json({
            success: true,
            message: "Successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to follow user"
        })
    }
}




export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { displayName, username, email } = req.body;

        
        if (!displayName?.trim() || !username?.trim() || !email?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

       
        if (!/^[a-z0-9_]+$/.test(username)) {
            return res.status(400).json({
                success: false,
                error: 'Username can only contain lowercase letters, numbers and underscores'
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { username, _id: { $ne: user._id } },
                { email, _id: { $ne: user._id } }
            ]
        });

        if (existingUser) {
            const field = existingUser.username === username ? 'username' : 'email';
            return res.status(400).json({
                success: false,
                error: `${field} is already in use`
            });
        }

       
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                displayName: displayName.trim(),
                username: username.toLowerCase().trim(),
                email: email.toLowerCase().trim()
            },
            { new: true, runValidators: true }
        ).select('-hashedPassword');

        res.json({
            success: true,
            data: updatedUser
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update profile'
        });
    }
};

export const handleAvatarUpload = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const avatar = req.files.avatar;

       
        const optimizedImage = await sharp(avatar.data)
            .resize(500, 500, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({
                quality: 80,
                mozjpeg: true
            })
            .toBuffer();

       
        const uploadResponse = await uploadImage(
            optimizedImage,
            `avatar-${user._id}-${Date.now()}`,
            '/avatars'
        )

      
        if (user.imgFileId) {
            await deleteImage(user.imgFileId);
        }
        
    
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                img: uploadResponse.url,
                imgFileId: uploadResponse.fileId
            },
            { new: true }
        ).select('-hashedPassword');

        res.json({
            success: true,
            data: {
                img: updatedUser.img,
                imgFileId: updatedUser.imgFileId
            }
        });

    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update avatar'
        });
    }
};