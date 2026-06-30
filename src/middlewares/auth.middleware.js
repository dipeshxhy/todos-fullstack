import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';

const authenticate = async (req, res, next) => {
  const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw ApiError.unAuthorized('No bearer token or cookies  provided');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      throw ApiError.unAuthorized('Invalid Access Token');
    }
    req.user = user;
    next();
  } catch (error) {
    throw ApiError.unAuthorized('Invalid token');
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden('You do not have permission to perform this action');
    }
    next();
  };
};
export { authenticate, authorize };
