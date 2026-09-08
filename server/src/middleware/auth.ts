import type { Request, Response, NextFunction } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './errorHandler.js';
import { User } from '../models/User.js';

export type Role = 'superadmin' | 'admin' | 'instructor';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export function signAccessToken(id: string, role: Role) {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ id, role, type: 'access' }, env.JWT_SECRET, options);
}

export function signRefreshToken(id: string, role: Role) {
  const options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ id, role, type: 'refresh' }, env.JWT_REFRESH_SECRET, options);
}

export function setAuthCookies(res: Response, access: string, refresh: string) {
  const isProd = env.NODE_ENV === 'production' || env.COOKIE_SECURE;
  res.cookie('cxn_access', access, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  });
  res.cookie('cxn_refresh', refresh, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('cxn_access', { path: '/' });
  res.clearCookie('cxn_refresh', { path: '/' });
}

export async function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = req.cookies?.cxn_access as string | undefined;
  if (!token) return next(new AppError('Authentication required', 401));

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; role: Role; type: string };
    if (payload.type !== 'access') return next(new AppError('Invalid token', 401));
    const user = await User.findById(payload.id).select('role isActive');
    if (!user || !user.isActive) return next(new AppError('Account unavailable', 401));
    req.user = { id: payload.id, role: user.role };
    next();
  } catch {
    next(new AppError('Invalid or expired session', 401));
  }
}

export function requireRole(...roles: Role[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError('Authentication required', 401));
    if (!roles.includes(req.user.role)) return next(new AppError('Forbidden', 403));
    next();
  };
}
