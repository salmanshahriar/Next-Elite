import { cn } from '@/libs/utils';

export function BlurGlow({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <div
      aria-hidden
      className={cn('absolute rounded-full blur-[133px]', className)}
      style={{ background: color }}
    />
  );
}
