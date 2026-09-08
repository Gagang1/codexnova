import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ['workshop', 'seminar', 'webinar', 'hackathon', 'bootcamp', 'career'],
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true },
    description: { type: String, required: true },
    speaker: { type: String, default: 'Speaker to be announced' },
    registrationOpen: { type: Boolean, default: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

eventSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export const Event = mongoose.model('Event', eventSchema);
