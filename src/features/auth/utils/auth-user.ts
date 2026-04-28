import type { AuthUser, UserRole } from '@/features/auth/types/types';
import { getPermissionsForRole } from '@/features/auth/utils/authorization';

export function getRoleFromEmail(
  email: string | null | undefined,
  adminEmails: string[],
): UserRole {
  if (!email) {
    return 'user';
  }
  return adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';
}

export function sessionUserToAuthUser(params: {
  id?: string;
  email?: string | null;
  role?: UserRole;
}): AuthUser {
  const resolvedRole = params.role ?? 'user';
  const email = params.email ?? '';
  return {
    id: (params.id ?? email) || 'user',
    email,
    role: resolvedRole,
    permissions: getPermissionsForRole(resolvedRole),
  };
}
