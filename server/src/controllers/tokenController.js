const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.status(403);

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const token = jwt.sign(
                {
                    "userId": decoded._id,
                    "role": decoded.role
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '10m' }
            );
            res.json({ token })
        }
    );
}

module.exports = { handleRefreshToken }