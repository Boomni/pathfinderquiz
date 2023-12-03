// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the decoded information
      const user = await User.findOne({ _id: decoded._id});

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

const isAdmin = authMiddleware(['admin']);
const isSuperuser = authMiddleware(['superuser']);
const isPathfinder = authMiddleware(['pathfinder']);

module.exports = { isAdmin, isSuperuser, isPathfinder };