import { BackgroundGradient } from '@/components/shared/background-gradient';
import Header from '@/features/navigation/header';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundGradient />
      <Header />
      <main id="main-content" className="relative z-10 flex-1 pt-[60px]">
        {children}
      </main>
    </>
  );
};

export default PublicLayout;
