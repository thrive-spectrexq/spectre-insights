// src/routes/userRoutes.ts

import { Router } from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    requestPasswordReset,
    resetPassword,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Password Reset routes
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected routes - Require Authentication
router.get('/profile', authMiddleware, getUserProfile);

export default router;
