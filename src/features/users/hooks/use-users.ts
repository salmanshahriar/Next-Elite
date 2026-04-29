'use client';

import { useQuery } from '@tanstack/react-query';
import { getUser, getUsers } from '../api';

export const usersQueryKeys = {
  all: ['users'] as const,
  list: () => [...usersQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...usersQueryKeys.all, 'detail', id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: usersQueryKeys.list(),
    queryFn: getUsers,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: usersQueryKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
