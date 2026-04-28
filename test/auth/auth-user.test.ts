import {
  getRoleFromEmail,
  sessionUserToAuthUser,
} from '@/features/auth/utils/auth-user';
import { getPermissionsForRole } from '@/features/auth/utils/authorization';
import { describe, expect, it } from 'vitest';

describe('auth-user utils', () => {
  it('resolves admin role from configured admin emails', () => {
    const role = getRoleFromEmail('admin@example.com', ['admin@example.com']);
    expect(role).toBe('admin');
  });

  it('falls back to user role when email is not configured', () => {
    const role = getRoleFromEmail('user@example.com', ['admin@example.com']);
    expect(role).toBe('user');
  });

  it('maps session user into app auth user payload', () => {
    const authUser = sessionUserToAuthUser({
      id: 'user-1',
      email: 'admin@example.com',
      role: 'admin',
    });

    expect(authUser).toEqual({
      id: 'user-1',
      email: 'admin@example.com',
      role: 'admin',
      permissions: getPermissionsForRole('admin'),
    });
  });
});
