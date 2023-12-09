const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
    );

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error('Unauthorized');
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ error: 'Token expired' });
    }

    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = verifyJWT;