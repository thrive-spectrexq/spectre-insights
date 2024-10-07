// src/controllers/adminController.ts
import { Request, Response } from 'express';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import config from '../config'; // Ensure you have this import

// Register a new admin
export const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Create the admin
    const admin = await Admin.create({ email, password });

    // Convert Mongoose document to plain object
    const adminObject = admin.toObject();

    // Omit the password using destructuring
    const { password: _, ...adminResponse } = adminObject;

    // Send the response without the password
    res.status(201).json(adminResponse);
});

// Login admin
export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find admin by email and include password field
    const admin = await Admin.findOne({ email }).select('+password');

    if (admin && await admin.comparePassword(password)) {
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            config.jwt.secret,
            { expiresIn: '1h' }
        );

        // Optionally, you can also send admin details without the password
        const adminObject = admin.toObject();
        const { password: _, ...adminResponse } = adminObject;

        res.json({ token, admin: adminResponse });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
