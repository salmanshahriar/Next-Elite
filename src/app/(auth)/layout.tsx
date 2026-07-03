import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      id="main-content"
      className="relative z-10 min-h-screen bg-page-chrome"
    >
      {children}
    </main>
  );
};

export default AuthLayout;
