'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/utils';

// The thumb sits inside a 1px border plus the track padding. Square corners
// stay concentric: track radius = thumb radius (5px) + that inset.
const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
  {
    variants: {
      variant: {
        default: 'rounded-full',
        square: '',
      },
      size: {
        default: 'h-4.5 w-8',
        lg: 'h-6 w-11 p-0.5',
      },
    },
    compoundVariants: [
      { variant: 'square', size: 'default', className: 'rounded-sm' },
      { variant: 'square', size: 'lg', className: 'rounded-md' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const switchThumbVariants = cva(
  'group/thumb pointer-events-none relative flex items-center justify-center bg-background shadow-xs ring-0 transition-transform data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
  {
    variants: {
      variant: {
        default: 'rounded-full',
        square: 'rounded-[calc(var(--radius-sm)-1px)]',
      },
      size: {
        default:
          'size-4 data-[state=checked]:translate-x-3.5 rtl:data-[state=checked]:-translate-x-3.5',
        lg: 'size-4.5 data-[state=checked]:translate-x-5 rtl:data-[state=checked]:-translate-x-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface SwitchProps
  extends
    React.ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  thumbClassName?: string;
}

function Switch({
  className,
  thumbClassName,
  checkedIcon,
  uncheckedIcon,
  variant,
  size,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant, size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ variant, size }), thumbClassName)}
      >
        {uncheckedIcon && (
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-data-[state=checked]/thumb:opacity-0 group-data-[state=unchecked]/thumb:opacity-100">
            {uncheckedIcon}
          </span>
        )}
        {checkedIcon && (
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-data-[state=checked]/thumb:opacity-100 group-data-[state=unchecked]/thumb:opacity-0">
            {checkedIcon}
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants, switchThumbVariants };
export type { SwitchProps };
