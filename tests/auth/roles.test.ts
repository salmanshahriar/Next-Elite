import {
  getPermissionsForRole,
  getRoleFromEmail,
} from '@/features/auth/rbac/roles';
import { describe, expect, it } from 'vitest';

describe('roles', () => {
  it('resolves admin role from configured admin emails', () => {
    const role = getRoleFromEmail('admin@example.com', ['admin@example.com']);
    expect(role).toBe('admin');
  });

  it('falls back to user role when email is not configured', () => {
    const role = getRoleFromEmail('user@example.com', ['admin@example.com']);
    expect(role).toBe('user');
  });

  it('returns user permissions for the user role', () => {
    expect(getPermissionsForRole('user')).toContain('dashboard.view:user');
    expect(getPermissionsForRole('user')).not.toContain('dashboard.view:admin');
  });

  it('returns admin permissions for the admin role', () => {
    expect(getPermissionsForRole('admin')).toContain('dashboard.view:admin');
    expect(getPermissionsForRole('admin')).toContain('dashboard.view:user');
  });
});
