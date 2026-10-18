import { CircleNotchIcon } from '@phosphor-icons/react/ssr';

import { cn } from '@/libs/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <CircleNotchIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
