// backend/src/routes/servicesRoutes.ts
import { Router } from 'express';
import { getAllServices } from '../controllers/servicesController';
import { authMiddleware } from '../middlewares/authMiddleware'; // If needed

const router = Router();

// Public route to get all services
router.get('/', getAllServices);

export default router;
