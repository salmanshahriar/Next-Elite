import { describe, expect, it, vi } from 'vitest';

vi.mock('@/libs/env', () => ({
  env: {
    NEXT_PUBLIC_DEMO_MODE: true,
    NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: false,
  },
}));

import { getRoleFromEmail } from '@/features/auth/rbac/roles';

describe('getRoleFromEmail in demo mode', () => {
  it('returns user for non-admin email', () => {
    expect(getRoleFromEmail('random@test.com', [])).toBe('user');
  });

  it('returns admin for demo admin email', () => {
    expect(getRoleFromEmail('admin@test.com', [])).toBe('admin');
  });

  it('returns user for demo user email', () => {
    expect(getRoleFromEmail('user@test.com', [])).toBe('user');
  });
});
