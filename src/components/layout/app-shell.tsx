'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/libs/utils';
import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  className?: string;
  variant?: 'header' | 'sidebar';
  defaultOpen?: boolean;
}

export function AppShell({
  children,
  className,
  variant = 'sidebar',
  defaultOpen = true,
}: AppShellProps) {
  if (variant === 'header') {
    return (
      <div className={cn('flex min-h-screen w-full flex-col', className)}>
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className={cn('w-full', className)}
    >
      {children}
    </SidebarProvider>
  );
}
