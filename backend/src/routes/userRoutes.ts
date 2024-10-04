// backend/src/routes/userRoutes.ts
import express from 'express'
import { registerUser, loginUser, getUserProfile } from '../controllers/userController'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)

export default router
