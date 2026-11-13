import AuthGlobe from '@/components/auth/auth-globe';
import { AuthTopbar } from '@/components/auth/auth-topbar';
import { AppBrand } from '@/components/layout/app-brand';
import { AuthProvider } from '@/features/auth/hooks/auth-provider';
import { getCurrentUser } from '@/features/auth/server/get-current-user';
import { env } from '@/libs/env';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return (
    <main
      id="main-content"
      className="relative flex h-[96svh] bg-background/80 md:m-4"
    >
      <section className="bg-blur-md @container relative hidden items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-primary/25 p-6 md:flex md:w-1/2 md:flex-col dark:bg-primary/5">
        <AuthGlobe className="absolute top-[calc(40%-18cqw)] left-1/2 w-[180%] -translate-x-1/2 opacity-80 dark:opacity-30" />
        <AppBrand
          size={44}
          logoClassName="h-10 w-10"
          nameClassName="text-3xl font-black"
          className="absolute top-[20%] left-1/2 z-10 flex max-w-md -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3"
        />
      </section>

      <section className="flex w-full flex-col p-4 pt-0 md:w-1/2 md:p-6 md:pt-0">
        <AuthTopbar />
        <div className="flex flex-1 items-center justify-center">
          <AuthProvider isGoogleEnabled={env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED}>
            {children}
          </AuthProvider>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
