import { cn } from '@/libs/utils';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-0.5">
        <h1 className="font-sans text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-2xl font-sans text-xs text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function PageLayout({
  children,
  className,
  centered = false,
}: PageLayoutProps) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-6',
        centered &&
          'min-h-[calc(100dvh-var(--app-header-height))] justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
