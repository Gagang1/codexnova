import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  MONGODB_URI: z.string().min(1).default('mongodb://127.0.0.1:27017/codexnova'),
  JWT_SECRET: z.string().min(16).default('dev_only_change_me_jwt_secret'),
  JWT_REFRESH_SECRET: z.string().min(16).default('dev_only_change_me_refresh_secret'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  COOKIE_SECURE: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  EMAIL_HOST: z.string().optional().default(''),
  EMAIL_PORT: z.coerce.number().optional().default(587),
  EMAIL_USER: z.string().optional().default(''),
  EMAIL_PASSWORD: z.string().optional().default(''),
  EMAIL_FROM: z.string().optional().default('Codex Nova <noreply@example.com>'),
  GOOGLE_SHEETS_WEBAPP_URL: z.string().optional().default(''),
  GOOGLE_SHEET_ID: z.string().optional().default('1Rtq6LbQ9IEdtLU_-Sxrm36V1dgw4dgG7-9zDsX8k0qQ'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
