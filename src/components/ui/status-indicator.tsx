import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/libs/utils';

const statusIndicatorVariants = cva('inline-block shrink-0 rounded-full', {
  variants: {
    variant: {
      success: 'bg-success',
      warning: 'bg-warning',
      destructive: 'bg-destructive',
      muted: 'bg-muted-foreground/50',
    },
    size: {
      sm: 'size-2',
      default: 'size-3',
      lg: 'size-4',
    },
  },
  defaultVariants: {
    variant: 'success',
    size: 'default',
  },
});

function StatusIndicator({
  className,
  variant,
  size,
  pulse = false,
  label,
  ...props
}: ComponentProps<'span'> &
  VariantProps<typeof statusIndicatorVariants> & {
    pulse?: boolean;
    label?: string;
  }) {
  return (
    <span
      data-slot="status-indicator"
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      className={cn(
        statusIndicatorVariants({ variant, size }),
        pulse && 'animate-pulse motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
}

export { StatusIndicator, statusIndicatorVariants };
