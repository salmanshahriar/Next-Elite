import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/libs/utils';

type StatCardProps = React.ComponentProps<'div'> & {
  title: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
};

function StatCard({
  title,
  value,
  icon,
  isLoading = false,
  className,
  ...props
}: StatCardProps) {
  if (isLoading) {
    return (
      <Skeleton className={cn('h-[126px] w-full rounded-xl', className)} />
    );
  }

  return (
    <div
      data-slot="stat-card"
      className={cn(
        'rounded-xl border bg-card p-4 text-card-foreground md:p-6',
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <p className="text-2xl font-medium tabular-nums md:text-3xl">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}

export type { StatCardProps };
export { StatCard };
