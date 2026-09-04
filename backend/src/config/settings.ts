import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env file if available
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

const envSchema = z.object({
  // Server Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
  APP_NAME: z.string().default('HackNEX 2026 API Backend'),
  APP_URL: z.string().url().default('http://localhost:5173'),
  API_URL: z.string().url().default('http://localhost:4000'),

  // CORS Configuration
  CORS_ORIGINS: z
    .string()
    .transform((val) => val.split(',').map((origin) => origin.trim()))
    .default('http://localhost:5173,http://localhost:4000'),

  // Database Placeholders (PostgreSQL via Neon)
  DATABASE_URL: z.string().optional().default('postgresql://user:password@localhost:5432/hacknex?schema=public'),
  DIRECT_URL: z.string().optional().default('postgresql://user:password@localhost:5432/hacknex?schema=public'),

  // Authentication Placeholders
  BETTER_AUTH_SECRET: z.string().default('dev_better_auth_secret_key_32_characters_long_minimum'),
  BETTER_AUTH_URL: z.string().default('http://localhost:4000'),
  JWT_SECRET: z.string().default('dev_jwt_secret_key_hacknex_2026'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Service Integration Placeholders (Optional/Pending for initial skeleton)
  RESEND_API_KEY: z.string().optional().default(''),
  EMAIL_FROM: z.string().default('HackNEX Team <noreply@hacknex.in>'),

  CLOUDINARY_CLOUD_NAME: z.string().optional().default(''),
  CLOUDINARY_API_KEY: z.string().optional().default(''),
  CLOUDINARY_API_SECRET: z.string().optional().default(''),

  PAYMENT_BASE_URL: z.string().optional().default('https://payment.karunya.edu/api/v1'),
  PAYMENT_API_KEY: z.string().optional().default(''),
  PAYMENT_SECRET: z.string().optional().default(''),
  PAYMENT_WEBHOOK_SECRET: z.string().optional().default(''),

  SENTRY_DSN: z.string().optional().default(''),
});

export type Environment = z.infer<typeof envSchema>;

function parseConfig(): Environment {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment configuration:', result.error.format());
    throw new Error('Invalid environment configuration parameters');
  }
  return result.data;
}

export const settings = parseConfig();
