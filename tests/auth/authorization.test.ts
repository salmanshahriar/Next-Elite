import { hasPermission } from '@/features/auth/rbac/can';
import { getPermissionsForRole } from '@/features/auth/rbac/roles';
import { describe, expect, it } from 'vitest';

describe('authorization', () => {
  it('grants admin permissions to the admin role', () => {
    const permissions = getPermissionsForRole('admin');
    expect(permissions).toContain('dashboard.view:user');
    expect(permissions).toContain('dashboard.view:admin');
  });

  it('grants only user permissions to the user role', () => {
    const permissions = getPermissionsForRole('user');
    expect(permissions).toContain('dashboard.view:user');
    expect(permissions).not.toContain('dashboard.view:admin');
  });

  it('checks permission membership via hasPermission', () => {
    const permissions = getPermissionsForRole('admin');
    expect(hasPermission(permissions, 'dashboard.view:admin')).toBe(true);
    expect(hasPermission(undefined, 'dashboard.view:admin')).toBe(false);
  });
});
