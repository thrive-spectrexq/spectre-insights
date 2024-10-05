// backend/src/routes/blogRoutes.ts

import express from 'express';
import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} from '../controllers/blogController';
import { authenticate, authorize } from '../middlewares/authorize';

const router = express.Router();

// Public Routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Protected Routes (Admin Only)
router.post('/', authenticate, authorize('admin'), createBlog);
router.put('/:id', authenticate, authorize('admin'), updateBlog);
router.delete('/:id', authenticate, authorize('admin'), deleteBlog);

export default router;
