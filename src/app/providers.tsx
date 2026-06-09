'use client';

import { AuthProvider } from '@/features/auth/hooks/auth-provider';
import type { AuthUser } from '@/features/auth/types';
import { TopLoader } from '@/features/navigation/top-loader';
import { ThemeProvider } from '@/features/theme/context/theme-provider';
import { getQueryClient } from '@/libs/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
}

const Providers = ({ children, initialUser = null }: ProvidersProps) => {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider defaultTheme="light">
      <TopLoader />
      <QueryClientProvider client={queryClient}>
        <AuthProvider initialUser={initialUser}>
          {children}
          <Toaster richColors />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
