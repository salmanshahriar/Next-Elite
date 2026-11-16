import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/libs/utils';

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant?: 'default' | 'success' | 'destructive';
};

function Progress({
  className,
  variant = 'default',
  value,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'relative h-6 w-full overflow-hidden rounded-full bg-primary/20',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 transition-all motion-reduce:transition-none',
          variant === 'default' && 'rounded-full bg-primary',
          variant === 'success' && 'bg-success',
          variant === 'destructive' && 'bg-destructive',
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
