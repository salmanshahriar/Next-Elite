import { redirect } from 'next/navigation';
import { getCurrentUser } from '../server/get-current-user';
import type { AuthUser } from '../types';

export async function requireUser(redirectTo = '/login'): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}
