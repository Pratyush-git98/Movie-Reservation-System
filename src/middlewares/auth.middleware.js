import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new apiError(401, 'No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id).select('-password');

    if (!user) {
      throw new apiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid Access Token")
  }
})

export { verifyJWT };