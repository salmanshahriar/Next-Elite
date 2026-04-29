'use client';

import { siteConfig } from '@/features/site/config';
import { cn } from '@/libs/utils';
import { Globe } from 'lucide-react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
}

function LogoSvg({ className, size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      role="img"
      aria-label="Logo"
    >
      <circle cx="90" cy="90" r="90" className="fill-black dark:fill-white" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        className="fill-white dark:fill-black"
      />
      <rect
        x="115"
        y="54"
        width="12"
        height="72"
        className="fill-white dark:fill-black"
      />
    </svg>
  );
}

export function Logo({ className, size = 28 }: LogoProps) {
  const logo = siteConfig.images?.logo;
  const alt = siteConfig.appName || siteConfig.title;

  if (logo === '/logo.svg') {
    return <LogoSvg className={className} size={size} />;
  }
  if (logo) {
    return (
      <Image
        src={logo}
        alt={alt}
        width={size}
        height={size}
        className={cn('shrink-0 object-contain', className)}
      />
    );
  }
  return <Globe className={cn('h-5 w-5 shrink-0', className)} />;
}
