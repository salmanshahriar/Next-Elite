import { hasPermission } from '@/features/auth/rbac/can';
import { requireUser } from '@/features/auth/rbac/require';
import { Sidebar } from '@/features/navigation/sidebar';
import type { ReactNode } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
  user: ReactNode;
  admin: ReactNode;
}

const ProtectedLayout = async ({
  children,
  user,
  admin,
}: ProtectedLayoutProps) => {
  const currentUser = await requireUser();
  const canViewAdmin = hasPermission(
    currentUser.permissions,
    'dashboard.view:admin',
  );
  const canViewUser = hasPermission(
    currentUser.permissions,
    'dashboard.view:user',
  );
  const slot = canViewAdmin ? admin : canViewUser ? user : children;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {slot}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
