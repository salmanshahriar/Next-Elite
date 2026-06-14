'use client';

import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/features/theme/context/theme-provider';
import { cn } from '@/libs/utils';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useSyncExternalStore } from 'react';

interface ThemeToggleProps {
  variant?: 'default' | 'titled';
  title?: string;
}

export function ThemeToggle({
  variant = 'default',
  title = 'Theme',
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const lastClickCoords = useRef<{ x: number; y: number } | null>(null);
  const switchRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted
    ? theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    : false;

  const toggleTheme = (
    e?:
      | React.PointerEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>,
  ) => {
    let coords = lastClickCoords.current;

    if (!coords) {
      const element = e?.currentTarget || switchRef.current;
      const rect = element?.getBoundingClientRect();
      coords = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    setTheme(isDark ? 'light' : 'dark', coords);
    lastClickCoords.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    lastClickCoords.current = { x: e.clientX, y: e.clientY };
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          variant === 'titled'
            ? 'flex h-9 w-full items-center justify-between px-2'
            : 'flex h-9 w-11 items-center justify-center',
        )}
      >
        <div className="h-6 w-11 animate-pulse rounded-full bg-muted/20" />
      </div>
    );
  }

  const switchComponent = (
    <div
      ref={switchRef}
      onPointerDown={handlePointerDown}
      className="inline-flex"
    >
      <Switch
        checked={isDark}
        onCheckedChange={() => toggleTheme()}
        size="lg"
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/20 dark:data-[state=unchecked]:bg-muted-foreground/25"
        checkedIcon={
          <Moon className="h-3 w-3 animate-in text-primary duration-300 fade-in zoom-in" />
        }
        uncheckedIcon={
          <Sun className="h-3 w-3 animate-in text-amber-500 duration-300 fade-in zoom-in" />
        }
        aria-label={t('common.toggleTheme')}
      />
    </div>
  );

  if (variant === 'titled') {
    return (
      <div
        onClick={() => toggleTheme()}
        onPointerDown={handlePointerDown}
        className="group flex w-full flex-1 cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-2 py-1 text-left transition-all hover:bg-accent/60"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme(e);
          }
        }}
      >
        <span className="truncate text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {title}
        </span>
        <span
          className="flex h-9 items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {switchComponent}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-1">
      {switchComponent}
    </div>
  );
}
