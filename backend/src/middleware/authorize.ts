import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export type UserRole = 'Admin' | 'Delivery Manager' | 'Project Manager' | 'Finance Manager' | 'Account Manager' | 'Team Member';

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!req.user.role) {
      return res.status(403).json({ error: 'User role not found' });
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
