import { Router } from 'express';
import { z } from 'zod';
import { ContactMessage } from '../models/ContactMessage.js';
import { Inquiry } from '../models/Inquiry.js';
import { Enrollment } from '../models/Enrollment.js';
import { Student } from '../models/Student.js';
import { isDatabaseConnected } from '../config/database.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { sendNotificationEmail } from '../services/email.js';
import { saveLeadToGoogleSheet, type SheetTab } from '../services/googleSheets.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createCrudController } from '../controllers/crudFactory.js';

const SUCCESS_MESSAGE = 'Our mentor will reach out to you soon.';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,16}$/),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
});

const enrollmentSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,16}$/),
  city: z.string().trim().min(2).max(80),
  college: z.string().trim().min(2).max(120),
  degree: z.string().trim().min(2).max(80),
  branch: z.string().trim().min(2).max(80),
  year: z.string().min(1),
  course: z.string().min(1),
  preferredMode: z.enum(['Online', 'Offline', 'Hybrid', 'Other modes coming soon']),
  message: z.string().trim().max(2000).optional(),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).optional(),
});

async function syncLeadToSheet(
  row: Parameters<typeof saveLeadToGoogleSheet>[0],
  sheetName: SheetTab,
) {
  const result = await saveLeadToGoogleSheet(row, sheetName);
  if (!result.saved) {
    console.warn(`[${sheetName}] Google Sheet sync skipped/failed:`, result.reason);
  }
  return result;
}

export const contactRouter = Router();
contactRouter.post(
  '/',
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const sheet = await syncLeadToSheet(
      {
        type: 'Talk to a Mentor',
        name: req.body.name,
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
      },
      'Enquiry',
    );

    let messageId: string | undefined;

    if (isDatabaseConnected()) {
      try {
        const message = await ContactMessage.create(req.body);
        await Inquiry.create({ ...req.body, status: 'new' });
        messageId = message.id;
      } catch (error) {
        console.warn('[contact] MongoDB save failed:', error);
      }
    }

    if (!sheet.saved && !messageId) {
      res.status(503).json({
        success: false,
        message: 'Could not save your message right now. Please try again in a moment.',
      });
      return;
    }

    void sendNotificationEmail(`Contact: ${req.body.subject}`, JSON.stringify(req.body, null, 2));
    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGE,
      data: { id: messageId, sheetSynced: sheet.saved },
    });
  }),
);

export const inquiryRouter = Router();
const inquiryCrud = createCrudController(Inquiry, { searchFields: ['name', 'email', 'subject'] });
inquiryRouter.post(
  '/',
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const sheet = await syncLeadToSheet(
      {
        type: 'Talk to a Mentor',
        name: req.body.name,
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
      },
      'Enquiry',
    );

    let inquiryId: string | undefined;

    if (isDatabaseConnected()) {
      try {
        const item = await Inquiry.create(req.body);
        inquiryId = item.id;
      } catch (error) {
        console.warn('[inquiry] MongoDB save failed:', error);
      }
    }

    if (!sheet.saved && !inquiryId) {
      res.status(503).json({
        success: false,
        message: 'Could not save your inquiry right now. Please try again in a moment.',
      });
      return;
    }

    void sendNotificationEmail(`Inquiry: ${req.body.subject}`, JSON.stringify(req.body, null, 2));
    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGE,
      data: { id: inquiryId, sheetSynced: sheet.saved },
    });
  }),
);
inquiryRouter.get('/', requireAuth, requireRole('superadmin', 'admin'), inquiryCrud.list);
inquiryRouter.put('/:id', requireAuth, requireRole('superadmin', 'admin'), inquiryCrud.update);
inquiryRouter.delete('/:id', requireAuth, requireRole('superadmin', 'admin'), inquiryCrud.remove);

export const enrollmentRouter = Router();
const enrollmentCrud = createCrudController(Enrollment, {
  searchFields: ['fullName', 'email', 'course'],
});

enrollmentRouter.post(
  '/',
  validate(enrollmentSchema),
  asyncHandler(async (req, res) => {
    const body = req.body as z.infer<typeof enrollmentSchema>;

    const sheet = await syncLeadToSheet(
      {
        type: 'Enroll Now',
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        city: body.city,
        college: body.college,
        degree: body.degree,
        branch: body.branch,
        year: body.year,
        course: body.course,
        preferredMode: body.preferredMode,
        message: body.message,
      },
      'Leads',
    );

    let enrollmentId: string | undefined;
    let paymentStatus = body.paymentStatus ?? 'pending';

    if (isDatabaseConnected()) {
      try {
        const student = await Student.findOneAndUpdate(
          { email: body.email },
          {
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            city: body.city,
            college: body.college,
            degree: body.degree,
            branch: body.branch,
            year: body.year,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        const enrollment = await Enrollment.create({
          ...body,
          student: student._id,
          paymentStatus,
          paymentProvider: 'none',
          status: 'enquiry',
        });

        enrollmentId = enrollment.id;
        paymentStatus = enrollment.paymentStatus;
      } catch (error) {
        console.warn('[enrollment] MongoDB save failed:', error);
      }
    }

    if (!sheet.saved && !enrollmentId) {
      res.status(503).json({
        success: false,
        message: 'Could not submit your enrolment right now. Please try again in a moment.',
      });
      return;
    }

    void sendNotificationEmail(`Enrolment: ${body.course}`, JSON.stringify(body, null, 2));
    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGE,
      data: {
        id: enrollmentId,
        paymentStatus,
        sheetSynced: sheet.saved,
      },
    });
  }),
);

enrollmentRouter.get('/', requireAuth, requireRole('superadmin', 'admin'), enrollmentCrud.list);
enrollmentRouter.put('/:id', requireAuth, requireRole('superadmin', 'admin'), enrollmentCrud.update);
enrollmentRouter.delete('/:id', requireAuth, requireRole('superadmin', 'admin'), enrollmentCrud.remove);
