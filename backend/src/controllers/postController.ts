// src/controllers/postController.ts
import { Request, Response } from 'express';
import Post from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.body.adminId });
    await post.save();
    res.status(201).json(post);
};

// Implement read, update, and delete similarly.
