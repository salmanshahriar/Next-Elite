import { describe, expect, it, vi } from 'vitest';

vi.mock('@/libs/env', () => ({
  env: {
    NEXT_PUBLIC_DEMO_MODE: true,
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: false,
  },
}));

import { getPermissionsForRole, getRoleFromEmail } from './roles';

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

    it('returns a new array each call (immutability)', () => {
      const a = getPermissionsForRole('admin');
      const b = getPermissionsForRole('admin');
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
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

    it('returns user for non-admin email in demo mode', () => {
      expect(getRoleFromEmail('random@test.com', [])).toBe('user');
    });

    it('returns admin for demo admin email in demo mode', () => {
      expect(getRoleFromEmail('admin@test.com', [])).toBe('admin');
    });

    it('returns user for demo user email in demo mode', () => {
      expect(getRoleFromEmail('user@test.com', [])).toBe('user');
    });

    it('returns user for null email', () => {
      expect(getRoleFromEmail(null, [])).toBe('user');
    });

    it('returns user for undefined email', () => {
      expect(getRoleFromEmail(undefined, [])).toBe('user');
    });
  });
});
