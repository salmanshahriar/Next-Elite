import { BlurGlow } from '@/components/shared/blur-glow';
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
    <div className="relative flex min-h-screen min-w-0 overflow-hidden border-0 bg-primary/20 backdrop-blur-md md:border md:border-border/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <BlurGlow
          color="rgba(118, 99, 255, 0.28)"
          className="top-0 right-0 h-[480px] w-[480px] translate-x-1/4 -translate-y-1/4"
        />
        <BlurGlow
          color="rgba(118, 99, 255, 0.28)"
          className="bottom-2 left-20 h-[520px] w-[520px] -translate-x-1/4 translate-y-1/4"
        />
      </div>
      <Sidebar />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pt-app-header md:pt-0">
        <Topbar />
        <main className="relative z-10 me-0 mb-0 min-h-0 flex-1 overflow-x-hidden overflow-y-auto rounded-none border-0 bg-background/90 md:me-2 md:mb-2 md:rounded-xl md:border md:border-border/40 dark:bg-background dark:md:border-border/60">
          <div className="ms-0 me-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">
            {slot}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
