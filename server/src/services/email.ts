import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

export async function sendNotificationEmail(subject: string, text: string) {
  if (!env.EMAIL_HOST || !env.EMAIL_USER || !env.EMAIL_PASSWORD) {
    console.info('[email:skipped]', subject, text.slice(0, 120));
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_PORT === 465,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: env.EMAIL_USER,
    subject,
    text,
  });
}
