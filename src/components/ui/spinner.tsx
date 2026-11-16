import { CircleNotchIcon } from '@phosphor-icons/react/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/libs/utils';

function Spinner({
  className,
  'aria-label': ariaLabel = 'Loading',
  ...props
}: ComponentProps<'svg'>) {
  return (
    <CircleNotchIcon
      role="status"
      aria-label={ariaLabel}
      className={cn(
        'size-4 animate-spin motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
