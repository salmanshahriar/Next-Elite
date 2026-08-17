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
    <>
      <Logo size={size} className={cn('h-7 w-7 shrink-0', logoClassName)} />
      {showName ? (
        <span
          className={cn(
            'truncate text-lg leading-tight font-semibold group-data-[state=collapsed]:hidden',
            nameClassName,
          )}
        >
          {siteConfig.appName || siteConfig.title}
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    'flex min-w-0 items-center gap-2.5 font-bold text-foreground rtl:flex-row-reverse',
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
