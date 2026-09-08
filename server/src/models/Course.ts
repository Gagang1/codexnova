import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true, maxlength: 280 },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: String, required: true },
    durationWeeks: { type: Number, required: true, min: 1 },
    mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true },
    projectCount: { type: Number, default: 0, min: 0 },
    fee: { type: String, default: 'Fee on enquiry' },
    feeAmount: { type: Number, default: 0, min: 0 },
    skills: [{ type: String }],
    tools: [{ type: String }],
    projects: [{ type: String }],
    prerequisites: [{ type: String }],
    certificate: { type: String, default: '' },
    curriculum: [{ title: String, topics: [String] }],
    faqs: [{ question: String, answer: String }],
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
    relatedSlugs: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  },
  { timestamps: true },
);

courseSchema.index({ title: 'text', shortDescription: 'text' });

courseSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export const Course = mongoose.model('Course', courseSchema);
