// src/controllers/userManagementController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
};

// Add delete, update user roles, etc.
