// backend/src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import asyncHandler from 'express-async-handler';
import { sendEmail } from '../utils/sendEmail';
import crypto from 'crypto';

// Existing helper function
const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: '1h',
  });
};

// Existing controller functions...

// @desc    Request Password Reset
// @route   POST /api/users/request-password-reset
// @access  Public
export const requestPasswordReset = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide your email address.' });
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email.' });
    }

    // Generate reset token
    const resetToken = user.generatePasswordReset();

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;

    // Email message
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
      // If email fails, reset the resetPasswordToken and resetPasswordExpires
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: 'Email could not be sent. Please try again later.' });
    }
  }
);

// @desc    Reset Password
// @route   POST /api/users/reset-password
// @access  Public
export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Invalid or missing token and password.' });
    }

    // Hash the token to compare with database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by resetPasswordToken and check if token has not expired
    const user: IUser | null = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    // Update the password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Optionally, send a confirmation email
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
      return res.status(500).json({ message: 'Email could not be sent. Please try again later.' });
    }
  }
);
