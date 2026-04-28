import Providers from '@/app/providers';
import { getAuthUser } from '@/features/auth/server/get-auth-user';
import { Sidebar } from '@/features/navigation/components/sidebar';
import { redirect } from 'next/navigation';
import type React from 'react';

const ProtectedLayout = async ({
  children,
  user,
  admin,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
}) => {
  const currentUser = await getAuthUser();
  if (!currentUser) {
    redirect('/login');
  }

  const canViewAdminDashboard =
    currentUser?.permissions.includes('dashboard.view:admin') ?? false;
  const canViewUserDashboard =
    currentUser?.permissions.includes('dashboard.view:user') ?? false;
  const content = canViewAdminDashboard
    ? admin
    : canViewUserDashboard
      ? user
      : children;

  return (
    <Providers>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {content}
          </div>
        </main>
      </div>
    </Providers>
  );
};

export default ProtectedLayout;
