import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const instructorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    designation: { type: String, required: true, trim: true },
    expertise: [{ type: String, trim: true }],
    experience: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 4000 },
    image: { type: String, default: '' },
    social: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

instructorSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.name) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

export const Instructor = mongoose.model('Instructor', instructorSchema);
