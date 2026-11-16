import { cn } from '@/libs/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-pulse rounded-md bg-foreground/10 motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
