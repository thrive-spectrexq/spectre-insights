// src/controllers/adminController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import Post from '../models/Post';

export const getAdminDashboard = async (req: Request, res: Response) => {
    try {
        // Fetch necessary statistics (e.g., total users, active posts, etc.)
        const stats = {
            totalUsers: await User.countDocuments(),
            totalPosts: await Post.countDocuments(),
            // Add more statistics as needed
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

