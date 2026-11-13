import { describe, expect, it } from 'vitest';

import { DEMO_ACCOUNTS, getDemoRoleByEmail } from './accounts';

describe('demo accounts', () => {
  it('has one admin and one user account', () => {
    expect(DEMO_ACCOUNTS.map((account) => account.role).sort()).toEqual([
      'admin',
      'user',
    ]);
  });

  it('finds the role by email, ignoring case', () => {
    expect(getDemoRoleByEmail('Admin@Test.com')).toBe('admin');
    expect(getDemoRoleByEmail('user@test.com')).toBe('user');
  });

  it('returns null for unknown or missing emails', () => {
    expect(getDemoRoleByEmail('unknown@test.com')).toBeNull();
    expect(getDemoRoleByEmail(null)).toBeNull();
    expect(getDemoRoleByEmail('')).toBeNull();
  });
});
