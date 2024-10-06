// backend/src/types/express/index.d.ts

import { IUser } from '../../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

interface AuthenticatedUser {
    id: string;
    role: 'user' | 'admin';
}

export { AuthenticatedUser };
