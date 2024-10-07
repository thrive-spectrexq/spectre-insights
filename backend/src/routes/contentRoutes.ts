// src/routes/contentRoutes.ts
import { Router } from 'express';
import {
    createBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
    // Add similar imports for services and products if applicable
} from '../controllers/contentController';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware'; // Secure your routes

const router = Router();

// Apply admin middleware to secure all routes in this file
router.use(adminAuthMiddleware);

// Blog routes
router.post('/blogs', createBlogPost);
router.get('/blogs', getAllBlogPosts);
router.put('/blogs/:id', updateBlogPost);
router.delete('/blogs/:id', deleteBlogPost);

// Add routes for products similarly if needed

export default router;
