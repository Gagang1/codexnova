import { Router } from 'express';
import { Category } from '../models/Category.js';
import { Course } from '../models/Course.js';
import { Instructor } from '../models/Instructor.js';
import { Project } from '../models/Project.js';
import { Event } from '../models/Event.js';
import { BlogPost } from '../models/BlogPost.js';
import { Testimonial } from '../models/Testimonial.js';
import { FAQ } from '../models/FAQ.js';
import { Student } from '../models/Student.js';
import { Settings } from '../models/Settings.js';
import { Enrollment } from '../models/Enrollment.js';
import { Inquiry } from '../models/Inquiry.js';
import { createCrudController } from '../controllers/crudFactory.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { AuthRequest } from '../middleware/auth.js';

export const catalogRouter = Router();
catalogRouter.use(optionalAuth);

const categories = createCrudController(Category, { searchFields: ['name', 'slug'] });
const courses = createCrudController(Course, {
  searchFields: ['title', 'shortDescription'],
  populate: ['category', 'instructor'],
});
const instructors = createCrudController(Instructor, {
  searchFields: ['name', 'designation'],
  publicFilter: { published: true },
});
const projects = createCrudController(Project, {
  searchFields: ['title', 'category'],
  publicFilter: { published: true },
});
const events = createCrudController(Event, {
  searchFields: ['title', 'type'],
  publicFilter: { published: true },
});
const blog = createCrudController(BlogPost, {
  searchFields: ['title', 'category', 'excerpt'],
  publicFilter: { published: true },
});
const testimonials = createCrudController(Testimonial, {
  searchFields: ['name', 'quote'],
  publicFilter: { published: true },
});
const faqs = createCrudController(FAQ, {
  searchFields: ['question', 'answer'],
  publicFilter: { published: true },
});
const students = createCrudController(Student, { searchFields: ['fullName', 'email', 'college'] });
const settings = createCrudController(Settings, { searchFields: ['key'] });

function mountPublicList(path: string, list: typeof categories.list, getBySlug?: typeof categories.getBySlug) {
  catalogRouter.get(path, list);
  if (getBySlug) catalogRouter.get(`${path}/:slug`, getBySlug);
}

function mountAdmin(path: string, crud: ReturnType<typeof createCrudController>) {
  catalogRouter.post(path, requireAuth, requireRole('superadmin', 'admin'), crud.create);
  catalogRouter.put(`${path}/:id`, requireAuth, requireRole('superadmin', 'admin'), crud.update);
  catalogRouter.delete(`${path}/:id`, requireAuth, requireRole('superadmin', 'admin'), crud.remove);
}

mountPublicList('/categories', categories.list);
mountAdmin('/categories', categories);

catalogRouter.get(
  '/courses',
  asyncHandler(async (req: AuthRequest, res) => {
    const { escapeRegex, paginate } = await import('../utils/query.js');
    const { page, limit, skip } = paginate(req.query);
    const isAdmin = req.user && ['admin', 'superadmin'].includes(req.user.role);
    const filter: Record<string, unknown> = isAdmin ? {} : { status: 'published' };
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (q) {
      filter.$or = [
        { title: { $regex: escapeRegex(q), $options: 'i' } },
        { shortDescription: { $regex: escapeRegex(q), $options: 'i' } },
      ];
    }
    if (typeof req.query.category === 'string' && req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      if (category) filter.category = category._id;
    }
    if (typeof req.query.level === 'string' && req.query.level) filter.level = req.query.level;
    if (typeof req.query.mode === 'string' && req.query.mode) filter.mode = req.query.mode;

    const [items, total] = await Promise.all([
      Course.find(filter)
        .populate(['category', 'instructor'])
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, total, page, limit });
  }),
);

catalogRouter.get(
  '/courses/:slug',
  asyncHandler(async (req, res) => {
    const item = await Course.findOne({ slug: req.params.slug, status: 'published' })
      .populate(['category', 'instructor'])
      .lean();
    if (!item) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: item });
  }),
);
mountAdmin('/courses', courses);

mountPublicList('/instructors', instructors.list, instructors.getBySlug);
mountAdmin('/instructors', instructors);

mountPublicList('/projects', projects.list, projects.getBySlug);
mountAdmin('/projects', projects);

mountPublicList('/events', events.list, events.getBySlug);
mountAdmin('/events', events);

mountPublicList('/blog', blog.list, blog.getBySlug);
mountAdmin('/blog', blog);

mountPublicList('/testimonials', testimonials.list);
mountAdmin('/testimonials', testimonials);

mountPublicList('/faqs', faqs.list);
mountAdmin('/faqs', faqs);

catalogRouter.get('/students', requireAuth, requireRole('superadmin', 'admin'), students.list);
mountAdmin('/students', students);

catalogRouter.get('/settings', requireAuth, requireRole('superadmin', 'admin'), settings.list);
mountAdmin('/settings', settings);

export const adminRouter = Router();
adminRouter.get(
  '/dashboard',
  requireAuth,
  requireRole('superadmin', 'admin'),
  asyncHandler(async (_req, res) => {
    const [students, inquiries, enrollments, coursesCount, eventsCount, posts] = await Promise.all([
      Student.countDocuments(),
      Inquiry.countDocuments(),
      Enrollment.countDocuments(),
      Course.countDocuments({ status: 'published' }),
      Event.countDocuments({ published: true }),
      BlogPost.countDocuments({ published: true }),
    ]);
    res.json({
      success: true,
      data: {
        students,
        inquiries,
        enrollments,
        courses: coursesCount,
        events: eventsCount,
        posts,
      },
    });
  }),
);
