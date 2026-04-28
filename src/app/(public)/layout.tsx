import PublicProviders from '@/app/(public)/providers';
import Header from '@/features/navigation/components/header';
import type React from 'react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicProviders>
      <Header />
      {children}
    </PublicProviders>
  );
}
