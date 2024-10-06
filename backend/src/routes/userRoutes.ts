// backend/src/routes/userRoutes.ts

import { Router } from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    deleteUser,
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

// Protected routes
router.get('/profile', authMiddleware(), getUserProfile);

// Admin routes
router.get('/', authMiddleware('admin'), getAllUsers);
router.delete('/:id', authMiddleware('admin'), deleteUser);

export default router;
