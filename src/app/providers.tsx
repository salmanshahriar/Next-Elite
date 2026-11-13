'use client';

import { ThemeOverlay } from '@/components/shared/theme-overlay';
import { TopLoader } from '@/components/shared/top-loader';
import { ThemeProvider } from '@/components/shared/theme-provider';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface ProvidersProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}

const Toaster = dynamic(() => import('sonner').then((mod) => mod.Toaster), {
  ssr: false,
});

const Providers = ({ children, defaultTheme = 'light' }: ProvidersProps) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <TopLoader />
      {children}
      <Toaster richColors />
      <ThemeOverlay />
    </ThemeProvider>
  );
};

export default Providers;
