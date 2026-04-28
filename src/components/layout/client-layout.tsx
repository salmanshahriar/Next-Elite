'use client';

import Header from '@/features/navigation/components/header';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();

  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname?.startsWith(route),
  );

  const showHeader = !isProtectedRoute;

  return (
    <>
      {showHeader && <Header />}
      <div className="min-h-screen transition-all duration-300 ease-in-out">
        {children}
      </div>
    </>
  );
};

export default ClientLayout;
