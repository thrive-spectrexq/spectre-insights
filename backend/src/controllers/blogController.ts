import { Request, Response } from 'express';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import asyncHandler from 'express-async-handler';

// Define the CustomRequest interface extending the Express Request
interface CustomRequest extends Request {
    user?: { id: string }; // Define the shape of the user object as needed
}

// Create a new blog post
export const createBlogPost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { title, content, category, tags } = req.body;

    // Ensure the required fields are provided
    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Title, content, and category are required');
    }

    const blogPost = new Blog({ title, content, category, tags, author: req.user?.id });
    await blogPost.save();
    res.status(201).json(blogPost);
});

// Get all blog posts
export const getAllBlogPosts = asyncHandler(async (req: CustomRequest, res: Response) => {
    const blogPosts = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.status(200).json(blogPosts);
});

// Search blogs
export const searchBlogs = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { query } = req.query;

    // Ensure a search query is provided
    if (!query || typeof query !== 'string') {
        res.status(400);
        throw new Error('Search query is required');
    }

    const blogs = await Blog.find({ title: { $regex: query, $options: 'i' } }).populate('author', 'name email');
    res.status(200).json(blogs);
});

// Add a comment to a blog post
export const addComment = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { blogId, content } = req.body;

    // Ensure required fields are provided
    if (!blogId || !content) {
        res.status(400);
        throw new Error('Blog ID and content are required');
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        res.status(404);
        throw new Error('Blog post not found');
    }

    const comment = new Comment({
        user: req.user?.id,
        blog: blogId,
        content,
    });

    await comment.save();
    res.status(201).json(comment);
});

// Get comments for a blog post
export const getComments = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { blogId } = req.params;

    // Validate that the blogId is provided
    if (!blogId) {
        res.status(400);
        throw new Error('Blog ID is required');
    }

    const comments = await Comment.find({ blog: blogId }).populate('user', 'name');
    res.status(200).json(comments);
});
