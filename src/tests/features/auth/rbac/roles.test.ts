import { describe, expect, it, vi } from 'vitest';

vi.mock('@/libs/env', () => ({
  env: {
    NEXT_PUBLIC_DEMO_MODE: false,
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: false,
  },
}));

import { hasPermission } from '@/features/auth/rbac/can';
import { getPermissionsForRole } from '@/features/auth/rbac/permissions';
import { getRoleFromEmail } from '@/features/auth/rbac/roles';

describe('roles', () => {
  describe('getPermissionsForRole', () => {
    it('returns both user and admin permissions for admin role', () => {
      const perms = getPermissionsForRole('admin');
      expect(perms).toEqual(['dashboard.view:user', 'dashboard.view:admin']);
    });

    it('returns only user permissions for user role', () => {
      const perms = getPermissionsForRole('user');
      expect(perms).toEqual(['dashboard.view:user']);
    });
  });

  describe('getRoleFromEmail', () => {
    it('returns admin when email is in adminEmails list', () => {
      expect(getRoleFromEmail('boss@corp.com', ['boss@corp.com'])).toBe(
        'admin',
      );
    });

    it('normalizes email to lowercase before checking', () => {
      expect(getRoleFromEmail('BOSS@CORP.COM', ['boss@corp.com'])).toBe(
        'admin',
      );
    });

    it('returns user for an email not in adminEmails', () => {
      expect(getRoleFromEmail('random@corp.com', [])).toBe('user');
    });

    it('does not grant admin to demo emails outside demo mode', () => {
      expect(getRoleFromEmail('admin@test.com', [])).toBe('user');
    });

    it('returns user for a missing email', () => {
      expect(getRoleFromEmail(null, [])).toBe('user');
      expect(getRoleFromEmail(undefined, [])).toBe('user');
    });
  });

  describe('hasPermission', () => {
    it('checks permission membership', () => {
      const permissions = getPermissionsForRole('admin');
      expect(hasPermission(permissions, 'dashboard.view:admin')).toBe(true);
      expect(hasPermission(undefined, 'dashboard.view:admin')).toBe(false);
    });
  });
});
