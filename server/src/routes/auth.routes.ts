import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import argon2 from 'argon2';
import { z } from 'zod';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { AppError } from '../middleware/errorHandler.js';
import {
  clearAuthCookies,
  requireAuth,
  setAuthCookies,
  signAccessToken,
  signRefreshToken,
  type AuthRequest,
} from '../middleware/auth.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try again later.' },
});

authRouter.post(
  '/login',
  loginLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body as z.infer<typeof loginSchema>;
    const user = await User.findOne({ email }).select('+passwordHash name email role isActive');
    if (!user || !user.isActive) throw new AppError('Invalid email or password', 401);

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new AppError('Invalid email or password', 401);

    const access = signAccessToken(user.id, user.role);
    const refresh = signRefreshToken(user.id, user.role);
    setAuthCookies(res, access, refresh);

    res.json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  }),
);

authRouter.post(
  '/logout',
  asyncHandler(async (_req, res) => {
    clearAuthCookies(res);
    res.json({ success: true, message: 'Logged out' });
  }),
);

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await User.findById(req.user!.id).select('name email role');
    if (!user) throw new AppError('User not found', 404);
    res.json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  }),
);
