// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization');

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user based on the decoded information
      const user = await User.findOne({ _id: decoded.UserId});

      // Check if the user exists and has the required role
      if (!user || !requiredRoles.includes(user.role)) {
        throw new Error('Unauthorized');
      }

      // Attach the user and token to the request for further use
      req.user = user;
      req.token = token;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).send({ error: 'Unauthorized' });
    }
  };
};

module.exports = authMiddleware;