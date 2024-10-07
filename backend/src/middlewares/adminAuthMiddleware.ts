// src/middlewares/adminAuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import config from '../config';

// Define the structure of the JWT payload for admin
interface AdminJwtPayload {
    id: string;
    role: 'admin';
}

// Middleware to check if the user is an admin
export const adminAuthMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Extract the token
        token = req.headers.authorization.split(' ')[1];
  
        // Verify and decode the token
        const decoded = jwt.verify(token, config.jwt.secret) as AdminJwtPayload;
  
        // Attach the decoded user info to the request object
        (req as any).admin = { id: decoded.id, role: decoded.role };
  
        next();
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  });;
