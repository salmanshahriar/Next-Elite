import { env } from '@/libs/env';
import { getDemoRoleByEmail } from '@/_demo(DELETE)/auth/accounts';
import type { UserRole } from './permissions';

export function getRoleFromEmail(
  email: string | null | undefined,
  adminEmails: readonly string[],
): UserRole {
  if (!email) return 'user';
  const normalized = email.toLowerCase();
  if (adminEmails.includes(normalized)) return 'admin';
  if (env.NEXT_PUBLIC_DEMO_MODE) {
    return getDemoRoleByEmail(normalized) ?? 'user';
  }
  return 'user';
}
