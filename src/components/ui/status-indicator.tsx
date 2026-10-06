import { cva, type VariantProps } from 'class-variance-authority';
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
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof statusIndicatorVariants> & { pulse?: boolean }) {
  return (
    <span
      data-slot="status-indicator"
      role="presentation"
      className={cn(
        statusIndicatorVariants({ variant, size }),
        pulse && 'animate-pulse',
        className,
      )}
      {...props}
    />
  );
}

export { StatusIndicator, statusIndicatorVariants };
