import { cn } from '@/libs/utils';
import Link from 'next/link';
import type { ComponentProps } from 'react';

type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: 'default' | 'underlined';
};

const TextLink = ({
  className,
  children,
  variant = 'default',
  ...props
}: TextLinkProps) => {
  return (
    <Link
      className={cn(
        'text-foreground',
        variant === 'default' && 'no-underline',
        variant === 'underlined' && 'text-foreground/50 underline',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TextLink;
