// backend/src/routes/adminRoutes.ts

import express from 'express';
import {
  getAllUsers,
  deleteUser,
  // Add more admin-specific controllers as needed
} from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply authMiddleware with 'admin' role to all admin routes
router.use(authMiddleware);

// Admin Routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Add more admin routes here

export default router;
