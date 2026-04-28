import { getServerEnvSafe } from '@/core/env';
import { createAuth } from '@/features/auth/lib/auth';
import type { AuthUser } from '@/features/auth/types/types';
import {
  getRoleFromEmail,
  sessionUserToAuthUser,
} from '@/features/auth/utils/auth-user';
import { headers } from 'next/headers';

export async function getAuthUser(): Promise<AuthUser | null> {
  const auth = createAuth();
  const env = getServerEnvSafe();
  if (!auth || !env) {
    return null;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sessionUser =
    session &&
    typeof session === 'object' &&
    'user' in session &&
    typeof session.user === 'object' &&
    session.user
      ? (session.user as { id?: string; email?: string | null })
      : null;

  if (!sessionUser) {
    return null;
  }

  return sessionUserToAuthUser({
    id: sessionUser.id ?? sessionUser.email ?? undefined,
    email: sessionUser.email ?? undefined,
    role: getRoleFromEmail(sessionUser.email, env.AUTH_ADMIN_EMAILS),
  });
}
