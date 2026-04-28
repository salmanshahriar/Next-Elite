'use client';

import Providers from '@/app/providers';
import { useAuth } from '@/features/auth/hooks/auth-context';
import { Sidebar } from '@/features/navigation/components/sidebar';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';

function ProtectedLayoutInner({
  children,
  userSlot,
  adminSlot,
}: {
  children: React.ReactNode;
  userSlot: React.ReactNode;
  adminSlot: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const canViewAdmin = user.permissions.includes('dashboard.view:admin');
  const canViewUser = user.permissions.includes('dashboard.view:user');

  const content = canViewAdmin ? adminSlot : canViewUser ? userSlot : children;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {content}
        </div>
      </main>
    </div>
  );
}

const ProtectedLayout = ({
  children,
  user: userSlot,
  admin: adminSlot,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
}) => {
  return (
    <Providers>
      <ProtectedLayoutInner userSlot={userSlot} adminSlot={adminSlot}>
        {children}
      </ProtectedLayoutInner>
    </Providers>
  );
};

export default ProtectedLayout;
