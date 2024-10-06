// backend/src/routes/productRoutes.ts
import { Router } from 'express';
import { getAllProducts } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware'; // If needed

const router = Router();

// Public route to get all products
router.get('/', getAllProducts);

// Additional routes for CRUD operations can be added here

export default router;
