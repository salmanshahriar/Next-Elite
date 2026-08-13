import { BlurGlow } from '@/components/shared/blur-glow';
import Header from '@/features/navigation/header';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen min-w-0 flex-1 flex-col rounded-none border-0 bg-background backdrop-blur-md md:rounded-xl md:border md:border-border/40">
      <div className="pointer-events-none sticky top-0 z-0 h-dvh shrink-0">
        <div className="relative h-full w-full overflow-hidden">
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
