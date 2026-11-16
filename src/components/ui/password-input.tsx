'use client';

import { cn } from '@/libs/utils';
import { EyeClosedIcon, EyeIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Input } from './input';
import InputError from './input-error';

interface PasswordInputProps extends Omit<
  React.ComponentProps<'input'>,
  'type'
> {
  error?: boolean;
  errorMessage?: string;
}

function PasswordInput({
  className,
  error = false,
  errorMessage,
  id,
  'aria-describedby': ariaDescribedBy,
  ...props
}: PasswordInputProps) {
  const t = useTranslations('common');
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const [showPassword, setShowPassword] = React.useState(false);
  const describedBy = [ariaDescribedBy, error && errorMessage ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div className="relative w-full">
        <Input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          data-slot="input"
          className={cn('pe-10', className)}
          {...props}
          aria-invalid={error || props['aria-invalid']}
          aria-describedby={describedBy || undefined}
        />

        <button
          type="button"
          onClick={() => setShowPassword((open) => !open)}
          className={cn(
            'absolute inset-y-0 end-0 flex h-full items-center justify-center rounded-e-md border-s px-3 text-muted-foreground transition-colors hover:text-foreground focus-visible:z-10 focus-visible:border-ring focus-visible:bg-muted/40 focus-visible:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/80 focus-visible:outline-none dark:border-input',
            error && 'border-s-destructive',
          )}
          aria-label={showPassword ? t('hidePassword') : t('showPassword')}
          aria-pressed={showPassword}
          aria-controls={inputId}
        >
          {showPassword ? (
            <EyeIcon size={20} aria-hidden="true" />
          ) : (
            <EyeClosedIcon size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      <InputError id={errorId} message={error ? errorMessage : undefined} />
    </>
  );
}

export { PasswordInput };
