const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const generateAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1m' }
    );

    return accessToken;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error('Unauthorized');
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const refreshToken = req.cookies.jwt;

      if (!refreshToken) {
        return res.status(403).json({ error: 'Refresh token missing' });
      }

      try {
        const accessToken = await generateAccessToken(refreshToken);
        return res.status(200).send({ success: true, token: `Bearer ${accessToken}` });
      } catch (generateError) {
        return res.status(403).json({ error: generateError.message });
      }
    }

    res.status(401).send({ error: error.message });
  }
};

module.exports = verifyJWT;
