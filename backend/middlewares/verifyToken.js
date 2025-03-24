import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Not Authenticated'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err || !payload) {
            return res.status(403).json({ success: false, error: "Token is invalid" });
        }
        
        req.userId = payload.userId;
        next();
    });
};
