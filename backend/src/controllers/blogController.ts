// backend/src/controllers/blogController.ts

import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';
import asyncHandler from 'express-async-handler';

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, category, tags, coverImage } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Please provide title, content, and category for the blog post');
    }

    const blog = new Blog({
        title,
        content,
        author: req.user, // Assuming req.user is populated by auth middleware
        category,
        tags,
        coverImage,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(blogs);
});

// @desc    Get single blog post by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, category, tags, coverImage } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        blog.tags = tags || blog.tags;
        blog.coverImage = coverImage || blog.coverImage;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog post removed' });
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});
