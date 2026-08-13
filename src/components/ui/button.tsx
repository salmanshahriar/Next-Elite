'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import LoaderIcon from '@/components/icons/loader-icon';
import Case from '@/components/shared/case';
import { cn } from '@/libs/utils';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 [&>span]:transition-transform [&>span]:duration-300 [&>span]:ease-out hover:[&>span]:translate-x-1 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-out hover:[&>svg]:-translate-x-1',
        subtle: 'bg-primary/10 text-primary hover:bg-primary/20',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        destructiveSubtle:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        outlineSuccess:
          'border border-success border-dashed text-success bg-transparent',
        outlineWarning:
          'border border-warning border-dashed text-warning bg-transparent',
        outlineDestructive:
          'border border-destructive border-dashed text-destructive bg-transparent',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 [&>span]:transition-transform [&>span]:duration-300 [&>span]:ease-out hover:[&>span]:translate-x-1 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-out hover:[&>svg]:-translate-x-1',
        ghost:
          'font-semibold hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        ghostPrimary: 'font-semibold text-primary hover:opacity-70',
        ghostDestructive: 'font-semibold text-destructive hover:opacity-70',
        toggle: 'hover:bg-transparent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        accent:
          'bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent/20 dark:focus-visible:ring-accent/40',
        muted: 'bg-muted text-muted-foreground',
        success:
          'bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function ButtonComp({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function Button({
  children,
  loading = false,
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const t = useTranslations('common');
  const isDisabled = loading || props.disabled;

  if (asChild) {
    return (
      <ButtonComp
        variant={variant}
        size={size}
        className={className}
        asChild
        disabled={isDisabled}
        {...props}
      >
        {children}
      </ButtonComp>
    );
  }

  return (
    <ButtonComp
      variant={variant}
      size={size}
      className={className}
      disabled={isDisabled}
      {...props}
    >
      <Case condition={loading}>
        <LoaderIcon />
        {t('loading')}
      </Case>
      <Case condition={!loading}>{children}</Case>
    </ButtonComp>
  );
}

export { Button, buttonVariants };
