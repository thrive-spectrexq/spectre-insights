// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

// General authentication middleware
export const authMiddleware = (roleRequired: 'user' | 'admin' = 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Unauthorized!' });

      // Attach user info to the request
      req.body.userId = decoded.id;
      req.body.role = decoded.role; // Assuming role is included in the JWT payload

      // Role-based access control
      if (roleRequired === 'admin' && req.body.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required.' });
      }

      next();
    });
  };
};
