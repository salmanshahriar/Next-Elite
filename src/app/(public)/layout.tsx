'use client';

import { AuthProvider } from '@/features/auth/hooks/auth-context';
import { LanguageProvider } from '@/features/i18n/hooks/language-context';
import Header from '@/features/navigation/components/header';
import type React from 'react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Header />
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
}
