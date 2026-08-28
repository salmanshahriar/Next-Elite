import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { AppShell } from '@/components/layout/app-shell';
import { Topbar } from '@/components/layout/topbar';
import { UserSidebar } from '@/components/layout/user-sidebar';
import { hasPermission } from '@/features/auth/rbac/can';
import { requireUser } from '@/features/auth/rbac/require';
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
  const userRole = hasPermission(
    currentUser.permissions,
    'dashboard.view:admin',
  )
    ? 'admin'
    : 'user';
  const canViewUser = hasPermission(
    currentUser.permissions,
    'dashboard.view:user',
  );
  const slot =
    (userRole === 'admin' && admin) || (canViewUser && user) || children;

  return (
    <AppShell variant="sidebar">
      {userRole === 'admin' ? <AdminSidebar /> : <UserSidebar />}
      <div className="relative flex h-svh max-h-svh w-full min-w-0 flex-1 overflow-hidden bg-background">
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pt-app-header md:pt-0">
          <Topbar />
          <main className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-muted/70 dark:bg-background">
            <div className="ms-0 me-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">
              {slot}
            </div>
          </main>
        </div>
      </div>
    </AppShell>
  );
};

export default ProtectedLayout;
