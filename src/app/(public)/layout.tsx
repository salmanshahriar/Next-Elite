import Header from '@/components/layout/header';
import { BlurGlow } from '@/components/shared/blur-glow';
import { getCurrentUser } from '@/features/auth/server/get-current-user';
import type { ReactNode } from 'react';

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <div className="relative flex min-h-screen w-full min-w-0 flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-visible"
      >
        <BlurGlow
          color="var(--glow-accent)"
          className="top-0 right-0 h-[480px] w-[480px] translate-x-1/4 -translate-y-1/4"
        />
        <BlurGlow
          color="var(--glow-accent)"
          className="top-20 left-0 h-[480px] w-[480px] -translate-x-1/4"
        />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl min-w-0 flex-1 flex-col overflow-x-clip">
        <Header user={user} />
        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
