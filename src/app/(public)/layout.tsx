import { BackgroundGradient } from '@/components/shared/background-gradient';
import Header from '@/features/navigation/header';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <BackgroundGradient />
      <Header />
      <main
        id="main-content"
        className="relative z-10 flex-1 pt-[calc(var(--app-header-height)+env(safe-area-inset-top,0px))]"
      >
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
