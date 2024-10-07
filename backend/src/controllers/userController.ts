// backend/src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import asyncHandler from 'express-async-handler';
import { sendEmail } from '../utils/sendEmail';
import crypto from 'crypto';

// Helper function to generate JWT
const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: '1h',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please provide all fields.' });
      return;
    }

    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    const user: IUser = new User({ name, email, password });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully.',
      token,
    });
  }
);

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide all fields.' });
      return;
    }

    const user: IUser | null = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful.',
      token,
    });
  }
);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Access the user ID attached to the request by the auth middleware
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Not authorized.' });
      return;
    }

    const user: IUser | null = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(user);
  }
);

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private / Admin
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users: IUser[] = await User.find().select('-password');
    res.status(200).json(users);
  }
);

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private / Admin
export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    await user.deleteOne();

    res.status(200).json({ message: 'User deleted successfully.' });
  }
);

// @desc    Request Password Reset
// @route   POST /api/users/request-password-reset
// @access  Public
export const requestPasswordReset = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Please provide your email address.' });
      return;
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'No user found with that email.' });
      return;
    }

    const resetToken = user.generatePasswordReset();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;

    const message = `
      <p>You have requested a password reset.</p>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetUrl}" target="_blank">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        html: message,
      });

      res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({ message: 'Email could not be sent. Please try again later.' });
    }
  }
);

// @desc    Reset Password
// @route   POST /api/users/reset-password
// @access  Public
export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: 'Invalid or missing token and password.' });
      return;
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user: IUser | null = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired password reset token.' });
      return;
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    const message = `
      <p>Your password has been successfully reset.</p>
      <p>If you did not perform this action, please contact support immediately.</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Successfully Reset',
        html: message,
      });

      res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Email could not be sent. Please try again later.' });
    }
  }
);
