'use client';

import { ThemeOverlay } from '@/components/shared/theme-overlay';
import { AuthProvider } from '@/features/auth/hooks/auth-provider';
import { TopLoader } from '@/components/shared/top-loader';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { getQueryClient } from '@/libs/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  isGoogleEnabled?: boolean;
}

const Providers = ({
  children,
  defaultTheme = 'light',
  isGoogleEnabled,
}: ProvidersProps) => {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <TopLoader />
      <QueryClientProvider client={queryClient}>
        <AuthProvider isGoogleEnabled={isGoogleEnabled}>
          {children}
          <Toaster richColors />
          <ThemeOverlay />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
