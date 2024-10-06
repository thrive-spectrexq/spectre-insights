// backend/src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import User, { IUser } from '../models/User';
import asyncHandler from 'express-async-handler';

interface JwtPayload {
  id: string;
  role: 'user' | 'admin';
}

export const authMiddleware = (requiredRole?: 'admin') =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

        // Attach user to request
        req.user = {
          id: decoded.id,
          role: decoded.role,
        };

        // Check for admin role if required
        if (requiredRole && decoded.role !== requiredRole) {
          res.status(403).json({ message: 'Forbidden: Admins only.' });
          return;
        }

        next();
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed.' });
        return;
      }
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token.' });
      return;
    }
  });
