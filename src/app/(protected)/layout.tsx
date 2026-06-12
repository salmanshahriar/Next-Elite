import { BackgroundGradient } from '@/components/shared/background-gradient';
import { hasPermission } from '@/features/auth/rbac/can';
import { requireUser } from '@/features/auth/rbac/require';
import { Sidebar } from '@/features/navigation/sidebar';
import { Topbar } from '@/features/navigation/topbar';
import type { ReactNode } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
  user?: ReactNode;
  admin?: ReactNode;
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
    <div className="relative flex h-screen overflow-hidden">
      <BackgroundGradient />
      <Sidebar />
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden pt-14 md:pt-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {slot}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
