const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status').status;
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Access Denied!');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token!');
  }
};

module.exports = authenticateToken;