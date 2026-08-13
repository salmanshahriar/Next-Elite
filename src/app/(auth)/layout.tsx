import { getCurrentUser } from '@/features/auth/server/get-current-user';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return (
    <main
      id="main-content"
      className="relative z-10 min-h-screen rounded-xl border border-border/40 bg-primary/20 backdrop-blur-md"
    >
      {children}
    </main>
  );
};

export default AuthLayout;
