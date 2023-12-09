// middleware/authMiddleware.js
const authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      console.log(req)
      if(!req.user || !requiredRoles.includes(req.user.role)) {
        throw new Error('Unauthorized');
      }
      next();
    } catch (error) {
      console.log(error)
      res.status(401).send({ error: 'Unauthorized' });
    }
  };
};

module.exports = authMiddleware;
