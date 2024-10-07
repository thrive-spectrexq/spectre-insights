// backend/src/types/express.d.ts

import { Request, Response, NextFunction } from 'express';

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      role: 'user' | 'admin';
    }

    interface AdminPayload {
      id: string;
      role: 'admin';
      permissions?: string[]; // Optional: Define permissions for the admin
    }

    interface Request {
      user?: UserPayload; // For general authMiddleware
      admin?: AdminPayload; // For adminAuthMiddleware
    }
  }
}
