import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true, maxlength: 320 },
    content: { type: String, required: true },
    category: { type: String, required: true, index: true },
    author: { type: String, required: true },
    publishedAt: { type: String, required: true },
    readingTime: { type: String, default: '5 min' },
    seoTitle: { type: String, required: true },
    metaDescription: { type: String, required: true, maxlength: 170 },
    coverImage: { type: String, default: '' },
    headings: [{ id: String, text: String }],
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

blogSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export const BlogPost = mongoose.model('BlogPost', blogSchema);
