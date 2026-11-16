'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { ArrowLeftIcon, XIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/libs/utils';

type SheetHeaderProps = React.ComponentProps<'div'> & {
  showBackButton?: boolean;
};

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-[100] bg-black/50 data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:duration-200 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  showCloseButton?: boolean;
}) {
  const t = useTranslations('common');

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed z-[100] flex transform-gpu flex-col bg-background shadow-lg data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:duration-250 motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none',
          side === 'right' &&
            'inset-y-0 end-0 h-full w-full border-s pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md rtl:data-[state=closed]:slide-out-to-left rtl:data-[state=open]:slide-in-from-left',
          side === 'left' &&
            'inset-y-0 start-0 h-full w-full border-e pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-md rtl:data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-right',
          side === 'top' &&
            'inset-x-0 top-0 max-h-[85dvh] border-b pt-[env(safe-area-inset-top)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
          side === 'bottom' &&
            'inset-x-0 bottom-0 max-h-[85dvh] border-t pb-[env(safe-area-inset-bottom)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute end-4 top-4 z-10 rounded-md opacity-70 ring-offset-background transition-opacity hover:bg-muted hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0"
          >
            <XIcon className="size-4" />
            <span className="sr-only">{t('close')}</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({
  className,
  children,
  showBackButton = false,
  ...props
}: SheetHeaderProps) {
  const t = useTranslations('common');

  return (
    <div
      data-slot="sheet-header"
      className={cn(
        'flex shrink-0 flex-col gap-1.5 border-b px-6 py-4 pe-14 text-start',
        className,
      )}
      {...props}
    >
      {showBackButton ? (
        <SheetPrimitive.Close
          data-slot="sheet-header-back"
          className="mb-1 flex w-fit cursor-pointer items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4 rtl:rotate-180" />
          {t('back')}
        </SheetPrimitive.Close>
      ) : null}
      {children}
    </div>
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-body"
      className={cn('flex-1 overflow-y-auto px-6 py-4', className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'mt-auto flex shrink-0 flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
