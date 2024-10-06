// backend/src/controllers/blogController.ts
import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';
import asyncHandler from 'express-async-handler';

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
});

// @desc    Search blog posts
// @route   GET /api/blogs/search?q=query
// @access  Public
export const searchBlogs = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string;
    const blogs = await Blog.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
        ],
    }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
});
