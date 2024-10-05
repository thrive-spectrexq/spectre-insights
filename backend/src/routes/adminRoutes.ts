// src/routes/adminRoutes.ts
import { Router } from 'express';
import { getAdminDashboard } from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Use 'admin' role required for admin routes
router.get('/dashboard', authMiddleware('admin'), getAdminDashboard);

export default router;
