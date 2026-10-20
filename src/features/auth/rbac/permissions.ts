export type UserRole = 'admin' | 'user';

export type AuthPermission = 'dashboard.view:user' | 'dashboard.view:admin';

const ROLE_PERMISSIONS = {
  user: ['dashboard.view:user'],
  admin: ['dashboard.view:user', 'dashboard.view:admin'],
} as const satisfies Record<UserRole, readonly AuthPermission[]>;

export function getPermissionsForRole(role: UserRole): AuthPermission[] {
  return [...ROLE_PERMISSIONS[role]];
}
