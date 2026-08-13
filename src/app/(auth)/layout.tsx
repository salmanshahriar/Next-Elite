import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
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
