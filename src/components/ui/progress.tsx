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
      className={cn(
        'relative h-6 w-full overflow-hidden rounded-full bg-primary/20',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          variant === 'default' &&
            'bg-progress shadow-progress h-full w-full flex-1 rounded-full transition-all',
          variant === 'success' &&
            'h-full w-full flex-1 bg-primary transition-all',
          variant === 'destructive' &&
            'h-full w-full flex-1 bg-destructive transition-all',
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
