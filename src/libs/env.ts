import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const csvEmails = z
  .string()
  .optional()
  .transform((value) =>
    (value ?? '')
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );

const booleanFromString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

const defaultAuthUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

const PLACEHOLDER_AUTH_SECRET = 'PLEASE_SET_BETTER_AUTH_SECRET_32_CHARS_MIN';

export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z
      .string()
      .url()
      .optional()
      .transform((value) => value ?? defaultAuthUrl()),
    BETTER_AUTH_SECRET: z
      .string()
      .min(32)
      .optional()
      .transform((value) => value ?? PLACEHOLDER_AUTH_SECRET),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    AUTH_ADMIN_EMAILS: csvEmails,
    SENTRY_DSN: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: booleanFromString,
    NEXT_PUBLIC_AUTH_ADMIN_EMAILS: csvEmails,
    NEXT_PUBLIC_DEMO_MODE: booleanFromString,
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED:
      process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED,
    NEXT_PUBLIC_AUTH_ADMIN_EMAILS:
      process.env.NEXT_PUBLIC_AUTH_ADMIN_EMAILS ??
      process.env.AUTH_ADMIN_EMAILS,
    NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
  emptyStringAsUndefined: true,
});
