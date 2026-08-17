import AuthAnimation from '@/components/auth/auth-animation';
import { AuthTopbar } from '@/components/auth/auth-topbar';
import { AppBrand } from '@/components/layout/app-brand';
import { getCurrentUser } from '@/features/auth/server/get-current-user';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return (
    <main
      id="main-content"
      className="relative flex h-[98svh] bg-background/80 md:m-2"
    >
      <section className="relative hidden items-center justify-center rounded-xl border border-border/40 bg-primary/10 p-6 md:flex md:w-2/3 md:flex-col">
        <div className="absolute h-full w-full">
          <AuthAnimation
            variant="square"
            pixelSize={5}
            color="white"
            patternScale={2}
            patternDensity={1}
            enableRipples
            rippleSpeed={0.3}
            rippleThickness={0.33}
            rippleIntensityScale={1.7}
            speed={0.5}
            transparent
            edgeFade={0.1}
          />
        </div>
        <AppBrand
          size={44}
          logoClassName="h-10 w-10"
          nameClassName="text-3xl font-black"
          className="relative z-10 flex max-w-md items-center justify-center gap-3"
        />
      </section>

      <section className="flex w-full flex-col p-4 pt-0 md:w-1/3 md:p-6 md:pt-0">
        <AuthTopbar />
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
