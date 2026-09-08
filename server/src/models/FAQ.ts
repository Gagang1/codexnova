import mongoose, { Schema } from 'mongoose';

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    audience: { type: String, enum: ['general', 'course'], default: 'general' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const FAQ = mongoose.model('FAQ', faqSchema);
