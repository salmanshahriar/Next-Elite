import type { AuthPermission, UserRole } from './rbac/permissions';

export type { AuthPermission, UserRole } from './rbac/permissions';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  permissions: AuthPermission[];
}
