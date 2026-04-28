import { getServerEnvSafe } from '@/core/env';
import { memoryAdapter } from '@better-auth/memory-adapter';
import { betterAuth } from 'better-auth';

export function createAuth() {
  const env = getServerEnvSafe();
  if (!env) {
    return null;
  }

  const socialProviders =
    env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }
      : undefined;

  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: memoryAdapter({}),
    socialProviders,
  });
}
