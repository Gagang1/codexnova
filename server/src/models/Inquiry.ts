import mongoose, { Schema } from 'mongoose';

const inquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, default: '' },
    subject: { type: String, required: true },
    message: { type: String, required: true, maxlength: 4000 },
    status: { type: String, enum: ['new', 'open', 'closed'], default: 'new', index: true },
  },
  { timestamps: true },
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
