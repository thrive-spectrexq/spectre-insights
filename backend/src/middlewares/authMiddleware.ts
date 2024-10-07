// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { IUser } from '../models/User';
import config from '../config';

// Define the structure of the JWT payload
interface JwtPayload {
  id: string;
  role: 'user' | 'admin';
}

// Middleware to check and decode the token
export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

      // Attach the decoded user info to the request object
      (req as any).user = { id: decoded.id, role: decoded.role };

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});
