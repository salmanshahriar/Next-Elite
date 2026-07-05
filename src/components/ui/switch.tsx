'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/libs/utils';

interface SwitchProps extends React.ComponentProps<
  typeof SwitchPrimitive.Root
> {
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  size?: 'default' | 'lg';
}

function Switch({
  className,
  checkedIcon,
  uncheckedIcon,
  size = 'default',
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        size === 'default' ? 'h-[1.15rem] w-8' : 'h-6 w-11',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'group/thumb pointer-events-none relative flex items-center justify-center rounded-full bg-background shadow-xs ring-0 transition-transform dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
          size === 'default'
            ? 'size-4 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:translate-x-0'
            : 'size-[18px] data-[state=checked]:translate-x-[24px] data-[state=unchecked]:translate-x-[2px] rtl:data-[state=checked]:-translate-x-[24px] rtl:data-[state=unchecked]:-translate-x-[2px]',
        )}
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

export { Switch };
