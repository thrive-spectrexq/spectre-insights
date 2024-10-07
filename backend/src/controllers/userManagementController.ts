// src/controllers/userManagementController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
};

export const updateUserRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};
