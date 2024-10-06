// backend/src/routes/blogRoutes.ts
import { Router } from 'express';
import { getAllBlogs, searchBlogs } from '../controllers/blogController';
import { authMiddleware } from '../middlewares/authMiddleware'; // If needed

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/search', searchBlogs);

// Protected or admin routes can be added here

export default router;
