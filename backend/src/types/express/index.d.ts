// src/types/express/index.d.ts

import { IUser } from '../../models/User';
import { IAdmin } from '../../models/Admin';

declare global {
    namespace Express {
        interface UserPayload {
            id: string;
            role: 'user' | 'admin';
        }

        interface AdminPayload {
            id: string;
            role: 'admin';
            permissions: string[]; // Optional: Define permissions for the admin
        }

        interface Request {
            user?: UserPayload; // For general authMiddleware
            admin?: AdminPayload; // For adminAuthMiddleware
        }
    }
}

export {};
