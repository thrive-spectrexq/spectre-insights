// src/routes/adminRoutes.ts

import express from 'express';
import {
    registerAdmin,
    loginAdmin,
} from '../controllers/adminController';
import {
    getDashboardStats,
} from '../controllers/dashboardController';
import {
    createBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
} from '../controllers/contentController';
import {
    getAllUsers,
    updateUserRole,
    deleteUser,
} from '../controllers/userManagementController';
import {
    getSiteSettings,
    updateSiteSettings,
} from '../controllers/siteSettingsController';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware'; // Use adminAuthMiddleware

const router = express.Router();

// Admin Authentication
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Apply adminAuthMiddleware to all routes below
router.use(adminAuthMiddleware);

// Admin Dashboard
router.get('/dashboard', getDashboardStats);

// Content Management
router.post('/blogs', createBlogPost);
router.get('/blogs', getAllBlogPosts);
router.put('/blogs/:id', updateBlogPost);
router.delete('/blogs/:id', deleteBlogPost);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Site Settings
router.get('/settings', getSiteSettings);
router.put('/settings', updateSiteSettings);

export default router;
