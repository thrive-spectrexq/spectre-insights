// backend/src/routes/testimonialRoutes.ts

import { Router } from 'express';
import { getTestimonials } from '../controllers/testimonialController';

const router = Router();

router.get('/', getTestimonials);

export default router;
