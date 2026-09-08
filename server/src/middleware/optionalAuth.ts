import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import type { AuthRequest, Role } from './auth.js';

export const optionalAuth: RequestHandler = async (req, _res, next) => {
  const token = (req as AuthRequest).cookies?.cxn_access as string | undefined;
  if (!token) return next();

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; role: Role; type: string };
    if (payload.type !== 'access') return next();
    const user = await User.findById(payload.id).select('role isActive');
    if (user?.isActive) {
      (req as AuthRequest).user = { id: payload.id, role: user.role };
    }
  } catch {
    // ignore invalid tokens for public routes
  }
  next();
};
