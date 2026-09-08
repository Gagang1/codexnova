import 'dotenv/config';
import argon2 from 'argon2';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Instructor } from '../models/Instructor.js';
import { Course } from '../models/Course.js';
import { Project } from '../models/Project.js';
import { Event } from '../models/Event.js';
import { BlogPost } from '../models/BlogPost.js';
import { Testimonial } from '../models/Testimonial.js';
import { FAQ } from '../models/FAQ.js';
import { Settings } from '../models/Settings.js';
import { seedPayload } from './seedData.js';

async function seed() {
  await connectDatabase();
  console.log('Connected. Seeding Codex Nova…');

  const email = process.env.ADMIN_SEED_EMAIL || 'superadmin@codexnova.local';
  const password = process.env.ADMIN_SEED_PASSWORD || 'ChangeMe_Now_123!';
  const passwordHash = await argon2.hash(password);

  await User.findOneAndUpdate(
    { email },
    {
      name: 'Codex Nova Superadmin',
      email,
      passwordHash,
      role: 'superadmin',
      isActive: true,
    },
    { upsert: true, new: true },
  );

  await Category.deleteMany({});
  await Instructor.deleteMany({});
  await Course.deleteMany({});
  await Project.deleteMany({});
  await Event.deleteMany({});
  await BlogPost.deleteMany({});
  await Testimonial.deleteMany({});
  await FAQ.deleteMany({});

  const categories = await Category.insertMany(seedPayload.categories);
  const categoryBySlug = Object.fromEntries(categories.map((item) => [item.slug, item._id]));

  const instructors = await Instructor.insertMany(seedPayload.instructors);
  const instructorBySlug = Object.fromEntries(instructors.map((item) => [item.slug, item._id]));

  await Course.insertMany(
    seedPayload.courses.map((course) => ({
      ...course,
      category: categoryBySlug[course.categorySlug],
      instructor: course.instructorSlug ? instructorBySlug[course.instructorSlug] : undefined,
    })),
  );

  await Project.insertMany(seedPayload.projects);
  await Event.insertMany(seedPayload.events);
  await BlogPost.insertMany(seedPayload.posts);
  await FAQ.insertMany(seedPayload.faqs);

  await Settings.findOneAndUpdate(
    { key: 'site' },
    {
      key: 'site',
      value: {
        announcement: 'New batches starting soon for C, C++, Java, and Python.',
        tagline: 'Learn useful skills. Build real projects. Get career-ready.',
      },
    },
    { upsert: true },
  );

  console.log('Seed complete.');
  console.log(`Admin login: ${email}`);
  console.log('Change ADMIN_SEED_PASSWORD before production.');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
