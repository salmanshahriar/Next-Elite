'use client';

import { Icon } from '@/components/icons/app-icons';
import { useTheme } from '@/components/shared/theme-provider';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';
import { useRef, useSyncExternalStore } from 'react';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const subscribeToSystemTheme = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(DARK_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('common');
  const switchRef = useRef<HTMLButtonElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const systemIsDark = useSyncExternalStore(
    subscribeToSystemTheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => null,
  );

  if (systemIsDark === null) {
    return (
      <div className="h-6 w-11 rounded-md border border-border bg-muted motion-safe:animate-pulse" />
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && systemIsDark);

  const handleChange = (checked: boolean) => {
    const rect = switchRef.current?.getBoundingClientRect();
    const origin =
      pointer.current ??
      (rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined);
    pointer.current = null;
    const next = checked ? 'dark' : 'light';
    setTheme(checked === systemIsDark ? 'system' : next, origin);
  };

  return (
    <Switch
      ref={switchRef}
      variant="square"
      size="lg"
      checked={isDark}
      onCheckedChange={handleChange}
      onPointerDown={(e) => {
        pointer.current = { x: e.clientX, y: e.clientY };
      }}
      aria-label={t('toggleTheme')}
      className="border-border bg-muted shadow-none transition-colors hover:border-primary/30 data-[state=checked]:bg-muted data-[state=unchecked]:bg-muted dark:data-[state=unchecked]:bg-muted"
      thumbClassName="bg-background shadow-xs dark:data-[state=checked]:bg-background dark:data-[state=unchecked]:bg-background"
      checkedIcon={
        <Icon
          name="moon"
          className="size-3 text-primary motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:zoom-in"
        />
      }
      uncheckedIcon={
        <Icon
          name="sun"
          className="size-3 text-warning motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:zoom-in"
        />
      }
    />
  );
}
