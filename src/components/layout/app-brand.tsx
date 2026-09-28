'use client';

import { Logo } from '@/components/shared/logo';
import { siteConfig } from '@/features/site/config';
import { cn } from '@/libs/utils';
import Link from 'next/link';

interface AppBrandProps {
  href?: string;
  className?: string;
  logoClassName?: string;
  nameClassName?: string;
  showName?: boolean;
  size?: number;
  onClick?: () => void;
}

export function AppBrand({
  href = '/',
  className,
  logoClassName,
  nameClassName,
  showName = true,
  size = 28,
  onClick,
}: AppBrandProps) {
  const content = (
    <div className="flex h-10 w-full min-w-0 items-center justify-start">
      <div className="flex size-10 shrink-0 items-center justify-center">
        <Logo size={size} className={cn('h-7 w-7 shrink-0', logoClassName)} />
      </div>
      {showName ? (
        <span
          className={cn(
            'ms-1 truncate text-lg leading-tight font-semibold whitespace-nowrap transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0',
            nameClassName,
          )}
        >
          {siteConfig.appName || siteConfig.title}
        </span>
      ) : null}
    </div>
  );

  const classes = cn(
    'flex min-w-0 items-center font-bold text-foreground rtl:flex-row-reverse',
    className,
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
