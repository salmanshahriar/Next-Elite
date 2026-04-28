'use client';

import { AuthProvider } from '@/features/auth/hooks/auth-context';
import { LanguageProvider } from '@/features/i18n/hooks/language-context';
import type React from 'react';

export default function PublicProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
}
