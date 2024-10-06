// src/controllers/contactController.ts

import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Contact, { IContact } from '../models/Contact';

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please provide all fields.');
    }

    const contactMessage: IContact = await Contact.create({
        name,
        email,
        message,
    });

    res.status(201).json({
        message: 'Your message has been sent successfully!',
        contactMessage,
    });
});
