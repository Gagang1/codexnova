import type { Model } from 'mongoose';
import type { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { escapeRegex, paginate } from '../utils/query.js';
import { AppError } from '../middleware/errorHandler.js';
import type { AuthRequest } from '../middleware/auth.js';

export function createCrudController<T>(
  model: Model<T>,
  options: {
    searchFields?: string[];
    publicFilter?: Record<string, unknown>;
    populate?: string | string[];
  } = {},
) {
  const { searchFields = [], publicFilter, populate } = options;

  const list = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page, limit, skip } = paginate(req.query);
    const isAdmin = req.user && ['admin', 'superadmin'].includes(req.user.role);
    const filter: Record<string, unknown> = { ...(isAdmin ? {} : (publicFilter ?? {})) };
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (q && searchFields.length) {
      filter.$or = searchFields.map((field) => ({ [field]: { $regex: escapeRegex(q), $options: 'i' } }));
    }

    let query = model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    if (populate) query = query.populate(populate);
    const [items, total] = await Promise.all([query.lean(), model.countDocuments(filter)]);
    res.json({ success: true, data: items, total, page, limit });
  });

  const getBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
    const isAdmin = req.user && ['admin', 'superadmin'].includes(req.user.role);
    let query = model.findOne({ slug: req.params.slug, ...(isAdmin ? {} : (publicFilter ?? {})) });
    if (populate) query = query.populate(populate);
    const item = await query.lean();
    if (!item) throw new AppError('Not found', 404);
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await model.create(req.body);
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new AppError('Not found', 404);
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) throw new AppError('Not found', 404);
    res.json({ success: true, message: 'Deleted' });
  });

  return { list, getBySlug, create, update, remove };
}
