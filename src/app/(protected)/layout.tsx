import { hasPermission } from '@/features/auth/rbac/can';
import { requireUser } from '@/features/auth/rbac/require';
import { Sidebar } from '@/features/navigation/sidebar';
import { Topbar } from '@/features/navigation/topbar';
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
  const slot = (canViewAdmin && admin) || (canViewUser && user) || children;

  return (
    <div className="relative flex h-screen min-w-0 overflow-hidden bg-page-chrome">
      <Sidebar />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pt-app-header md:pt-0">
        <Topbar />
        <main className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="ms-0 me-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">
            {slot}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
