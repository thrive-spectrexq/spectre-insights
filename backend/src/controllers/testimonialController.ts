// backend/src/controllers/testimonialController.ts

import { Request, Response, NextFunction } from 'express';
import Testimonial, { ITestimonial } from '../models/Testimonial';
import asyncHandler from 'express-async-handler';

// @desc    Get all testimonials with optional limit
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 0;
    const testimonials: ITestimonial[] = await Testimonial.find().limit(limit);
    res.status(200).json({ testimonials });
});
