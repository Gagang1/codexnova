import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true, maxlength: 4000 },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ContactMessage = mongoose.model('ContactMessage', contactSchema);
