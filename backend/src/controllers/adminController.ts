// backend/src/controllers/adminController.ts

import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import asyncHandler from 'express-async-handler';

// @desc    Get all users (Admin)
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users: IUser[] = await User.find().select('-password');
    res.status(200).json(users);
  }
);

// @desc    Delete a user (Admin)
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

// Add more admin-specific controllers as needed
