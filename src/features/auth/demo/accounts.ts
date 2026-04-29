import type { UserRole } from '../rbac/permissions';

export interface DemoAccount {
  label: string;
  email: string;
  password: string;
  role: UserRole;
}

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  {
    label: 'Admin',
    email: 'admin@test.com',
    password: '12345678',
    role: 'admin',
  },
  {
    label: 'User',
    email: 'user@test.com',
    password: '12345678',
    role: 'user',
  },
] as const;

export function getDemoRoleByEmail(
  email: string | null | undefined,
): UserRole | null {
  if (!email) return null;
  const normalized = email.toLowerCase();
  return (
    DEMO_ACCOUNTS.find((account) => account.email.toLowerCase() === normalized)
      ?.role ?? null
  );
}
