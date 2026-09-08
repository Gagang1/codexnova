import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    technologies: [{ type: String }],
    shortDescription: { type: String, required: true, maxlength: 280 },
    description: { type: String, required: true },
    outcomes: [{ type: String }],
    image: { type: String, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

projectSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export const Project = mongoose.model('Project', projectSchema);
