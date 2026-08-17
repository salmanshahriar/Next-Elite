import Header from '@/components/layout/header';
import { BlurGlow } from '@/components/shared/blur-glow';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl min-w-0 flex-1 flex-col bg-background backdrop-blur-md">
      <div className="pointer-events-none sticky top-0 z-0 h-dvh shrink-0">
        <div className="relative h-full w-full">
          <BlurGlow
            color="rgba(118, 99, 255, 0.28)"
            className="top-0 right-0 h-[480px] w-[480px] translate-x-1/4 -translate-y-1/4"
          />
          <BlurGlow
            color="rgba(118, 99, 255, 0.28)"
            className="top-20 left-0 h-[480px] w-[480px] -translate-x-1/4"
          />
        </div>
      </div>
      <div className="relative z-10 -mt-[100dvh] flex flex-1 flex-col">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
