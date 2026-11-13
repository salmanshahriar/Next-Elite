'use client';

import { getQueryClient } from '@/libs/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
