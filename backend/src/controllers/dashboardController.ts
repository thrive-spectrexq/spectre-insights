// src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import Blog from '../models/Blog';
import Contact from '../models/Contact';

// Controller to get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // Count total number of users
        const userCount = await User.countDocuments();
        
        // Count total number of blog posts
        const blogCount = await Blog.countDocuments();
        
        // Count total number of contacts (messages submitted through contact form)
        const contactCount = await Contact.countDocuments();

        // Respond with the counts
        res.json({
            userCount,
            blogCount,
            contactCount,
        });
    } catch (error) {
        // Handle any errors that occur during the counting process
        console.error(error);
        res.status(500).json({ message: 'Error retrieving dashboard statistics' });
    }
};
