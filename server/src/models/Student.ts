import mongoose, { Schema } from 'mongoose';

const studentSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, default: '' },
    college: { type: String, default: '' },
    degree: { type: String, default: '' },
    branch: { type: String, default: '' },
    year: { type: String, default: '' },
  },
  { timestamps: true },
);

studentSchema.index({ email: 1, phone: 1 });

export const Student = mongoose.model('Student', studentSchema);
