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
        'text-foreground underline-offset-2',
        variant === 'default' &&
          'underline decoration-transparent hover:decoration-current',
        variant === 'underlined' && 'text-muted-foreground underline',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TextLink;
