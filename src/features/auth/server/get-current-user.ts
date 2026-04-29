import 'server-only';

import { env } from '@/libs/env';
import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import { getPermissionsForRole, getRoleFromEmail } from '../rbac/roles';
import type { AuthUser } from '../types';

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.email) return null;
    const { id, email } = session.user;
    const role = getRoleFromEmail(email, env.AUTH_ADMIN_EMAILS);
    return {
      id: id ?? email,
      email,
      role,
      permissions: getPermissionsForRole(role),
    };
  } catch {
    return null;
  }
}
