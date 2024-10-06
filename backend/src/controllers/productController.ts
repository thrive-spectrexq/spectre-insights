// backend/src/controllers/productController.ts
import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import asyncHandler from 'express-async-handler';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json(products);
});
