// src/controllers/contentController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Blog, { IBlog } from '../models/Blog';

// Extend the Request interface to include user property
interface CustomRequest extends Request {
    user?: { id: string }; // Define the shape of the user object as needed
}

// Create a new blog post
export const createBlogPost = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { title, content, category, tags } = req.body;
    const blogPost: IBlog = new Blog({ title, content, category, tags, author: req.user?.id });
    await blogPost.save();
    res.status(201).json(blogPost);
});

// Get all blog posts
export const getAllBlogPosts = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const blogPosts = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.status(200).json(blogPosts);
});

// Update a blog post
export const updateBlogPost = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedBlog) {
        res.status(404).json({ message: 'Blog post not found' });
        return;
    }
    res.status(200).json(updatedBlog);
});

// Delete a blog post
export const deleteBlogPost = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
        res.status(404).json({ message: 'Blog post not found' });
        return;
    }
    res.status(204).send(); // No content response for successful delete
});
