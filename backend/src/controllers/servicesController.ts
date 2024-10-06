// backend/src/controllers/servicesController.ts
import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service';
import asyncHandler from 'express-async-handler';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = asyncHandler(async (req: Request, res: Response) => {
    const services = await Service.find();
    res.status(200).json(services);
});
