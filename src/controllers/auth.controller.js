import User from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

const register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw ApiError.badRequest('User with this email or username already exists');
  }
  const user = await User.create({ firstName, lastName, username, email, password });
  ApiResponse.created(res, { ok: true }, 'User registered successfully');
};
// !login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.badRequest('Invalid email or password');
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw ApiError.badRequest('Invalid email or password');
  }
  // generate token
  const token = user.generateAuthToken();
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  ApiResponse.success(
    res,
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
    'User logged in successfully',
  );
};

const logout = async (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  ApiResponse.success(res, null, 'User logged out successfully');
};

const getCurrentUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw ApiError.unAuthorized('User not authenticated');
  }
  ApiResponse.success(
    res,
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
    'profile fetched successfully',
  );
};

export { login, logout, register, getCurrentUser };
