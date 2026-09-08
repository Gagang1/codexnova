import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    college: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    course: { type: String, required: true, index: true },
    preferredMode: { type: String, enum: ['Online', 'Offline', 'Hybrid', 'Other modes coming soon'], required: true },
    message: { type: String, default: '', maxlength: 2000 },
    status: { type: String, enum: ['enquiry', 'confirmed', 'cancelled'], default: 'enquiry', index: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending', index: true },
    paymentProvider: { type: String, enum: ['none', 'razorpay', 'stripe'], default: 'none' },
    paymentReference: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
