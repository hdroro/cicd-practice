const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status').status;
const { createUser, findUser } = require('./user.service.js');
require('dotenv').config();

const registerService = async (payload) => {
  const { email, password } = payload;

  const existingUser = await findUser(email);
  if (existingUser) throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists')

  await createUser({ email, password });
};

const loginService = async (payload) => {
  const { email, password } = payload;

  const user = await findUser(email);

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Password incorrectly');

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED });
  return { email, token }
};

module.exports = {
    registerService,
    loginService
}