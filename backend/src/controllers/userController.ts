// backend/src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import asyncHandler from 'express-async-handler';

// Helper function to generate JWT
const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: '1h',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields.' });
    }

    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const user: IUser = new User({
      name,
      email,
      password,
    });

    await user.save();

    // Generate JWT Token
    const token = generateToken(user);

    return res.status(201).json({
      message: 'User registered successfully.',
      token,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all fields.' });
    }

    // Find user by email
    const user: IUser | null = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT Token
    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful.',
      token,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const user: IUser | null = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private / Admin
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const users: IUser[] = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private / Admin
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.deleteOne();

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
