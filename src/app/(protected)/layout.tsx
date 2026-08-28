import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { AppShell } from '@/components/layout/app-shell';
import { Topbar } from '@/components/layout/topbar';
import { UserSidebar } from '@/components/layout/user-sidebar';
import { BlurGlow } from '@/components/shared/blur-glow';
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
      <div className="relative flex h-svh max-h-svh w-full min-w-0 flex-1 overflow-hidden border-0 bg-primary/20 backdrop-blur-md md:border md:border-border/40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <BlurGlow
            color="rgba(118, 99, 255, 0.28)"
            className="top-0 left-10 h-[480px] w-[480px] translate-x-1/4 -translate-y-1/4"
          />
          <BlurGlow
            color="rgba(118, 99, 255, 0.28)"
            className="top-0 right-0 h-[480px] w-[480px] translate-x-1/4 -translate-y-1/4"
          />
          <BlurGlow
            color="rgba(118, 99, 255, 0.28)"
            className="bottom-0 left-10 h-[480px] w-[480px] translate-x-1/4 translate-y-1/4"
          />
        </div>
        {userRole === 'admin' ? <AdminSidebar /> : <UserSidebar />}
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pt-app-header md:pt-0">
          <Topbar />
          <main className="relative z-10 me-0 mb-0 min-h-0 flex-1 overflow-x-hidden overflow-y-auto rounded-none border-0 bg-background/80 backdrop-blur-md md:me-2 md:mb-2 md:rounded-md md:border md:border-border/40 dark:bg-background dark:md:border-border/60">
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
