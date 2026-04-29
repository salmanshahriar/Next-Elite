import { apiFetch } from '@/libs/api-client';
import { userListSchema, userSchema, type User } from './schemas/user';

export async function getUsers(): Promise<User[]> {
  return apiFetch('/users', { schema: userListSchema });
}

export async function getUser(id: string): Promise<User> {
  return apiFetch(`/users/${id}`, { schema: userSchema });
}
