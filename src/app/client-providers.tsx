'use client';

import { ThemeProvider } from '@/features/theme/context/theme-provider';
import type React from 'react';
import { Toaster } from 'sonner';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system">
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}
