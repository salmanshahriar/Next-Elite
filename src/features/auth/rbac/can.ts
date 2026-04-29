import type { AuthPermission } from './permissions';

export function hasPermission(
  permissions: readonly AuthPermission[] | undefined,
  permission: AuthPermission,
): boolean {
  return permissions?.includes(permission) ?? false;
}
