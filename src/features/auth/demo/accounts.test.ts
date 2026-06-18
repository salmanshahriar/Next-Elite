import { describe, expect, it } from 'vitest';

import { DEMO_ACCOUNTS, getDemoRoleByEmail } from './accounts';

describe('demo accounts', () => {
  describe('DEMO_ACCOUNTS', () => {
    it('contains admin and user accounts', () => {
      expect(DEMO_ACCOUNTS).toHaveLength(2);
      const roles = DEMO_ACCOUNTS.map((a) => a.role);
      expect(roles).toContain('admin');
      expect(roles).toContain('user');
    });

    it('all accounts have required fields', () => {
      for (const account of DEMO_ACCOUNTS) {
        expect(account.label).toBeTruthy();
        expect(account.email).toBeTruthy();
        expect(account.password).toBeTruthy();
        expect(account.role).toBeTruthy();
      }
    });
  });

  describe('getDemoRoleByEmail', () => {
    it('returns admin role for admin email', () => {
      expect(getDemoRoleByEmail('admin@test.com')).toBe('admin');
    });

    it('returns user role for user email', () => {
      expect(getDemoRoleByEmail('user@test.com')).toBe('user');
    });

    it('is case-insensitive', () => {
      expect(getDemoRoleByEmail('Admin@Test.com')).toBe('admin');
      expect(getDemoRoleByEmail('USER@test.com')).toBe('user');
    });

    it('returns null for unknown email', () => {
      expect(getDemoRoleByEmail('unknown@test.com')).toBeNull();
    });

    it('returns null for null input', () => {
      expect(getDemoRoleByEmail(null)).toBeNull();
    });

    it('returns null for undefined input', () => {
      expect(getDemoRoleByEmail(undefined)).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(getDemoRoleByEmail('')).toBeNull();
    });
  });
});
