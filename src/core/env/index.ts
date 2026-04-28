import { z } from 'zod';

const adminEmailsSchema = z
  .string()
  .optional()
  .transform((value) =>
    (value ?? '')
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );

const serverEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  AUTH_ADMIN_EMAILS: adminEmailsSchema,
});

const rawPublicEnv = {
  ...process.env,
  NEXT_PUBLIC_AUTH_ADMIN_EMAILS:
    process.env.NEXT_PUBLIC_AUTH_ADMIN_EMAILS ?? process.env.AUTH_ADMIN_EMAILS,
};

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  NEXT_PUBLIC_AUTH_ADMIN_EMAILS: adminEmailsSchema,
});

const publicEnvParsed = publicEnvSchema.parse(rawPublicEnv);

export function getServerEnv() {
  const serverEnvParsed = serverEnvSchema.parse(process.env);
  return {
    ...serverEnvParsed,
    ...publicEnvParsed,
  };
}

export function getServerEnvSafe() {
  const serverEnvParsed = serverEnvSchema.safeParse(process.env);
  if (!serverEnvParsed.success) {
    return null;
  }
  return {
    ...serverEnvParsed.data,
    ...publicEnvParsed,
  };
}

export const publicEnv = publicEnvParsed;
