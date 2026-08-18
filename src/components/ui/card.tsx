import * as React from 'react';

import { BlurGlow } from '@/components/shared/blur-glow';
import { cn } from '@/libs/utils';

const CARD_SURFACE_CLASS =
  'relative isolate overflow-hidden border border-border/40 bg-background/80 shadow-sm backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 hover:border-border hover:bg-background/90 hover:shadow-md dark:border-border/60 dark:bg-card dark:hover:border-border dark:hover:bg-card/95';

const CARD_GLOW_CLASS =
  'pointer-events-none absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 overflow-hidden opacity-75';

const CARD_SOLID_CLASS =
  'relative isolate overflow-hidden border border-border/40 bg-background shadow-sm dark:border-border/60 dark:bg-card';

interface CardProps extends React.ComponentProps<'div'> {
  flat?: boolean;
  nested?: boolean;
  variant?: 'solid' | 'glow';
}

function Card({
  className,
  flat = false,
  nested = false,
  variant = 'solid',
  children,
  ...props
}: CardProps) {
  if (flat) {
    return (
      <div
        data-slot="card"
        className={cn(
          'flex flex-col gap-6 rounded-md border border-border bg-card py-6 text-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col rounded-md py-6 text-foreground',
        variant === 'glow' ? CARD_SURFACE_CLASS : CARD_SOLID_CLASS,
        nested && 'backdrop-blur-none',
        className,
      )}
      {...props}
    >
      {variant === 'glow' && !nested ? (
        <BlurGlow
          color="rgba(118, 99, 255, 0.14)"
          className={CARD_GLOW_CLASS}
        />
      ) : null}
      <div className="relative z-[1] flex flex-col gap-6">{children}</div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold text-foreground', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
