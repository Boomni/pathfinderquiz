require('dotenv').config();
const errorHandler = (err, req, res, next) => {
    let statusCode;
  
    if (err.statusCode) {
        statusCode = err.statusCode;
    } else {
        statusCode = 500;
    }
  
    res.status(statusCode);
    res.json({
        msg: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  const CustomError = class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
  }
  
  module.exports = { errorHandler, CustomError };