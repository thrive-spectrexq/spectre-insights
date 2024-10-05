import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Adjust import according to your structure

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware(), getUserProfile); // Ensure authMiddleware returns a valid middleware function

export default router;
