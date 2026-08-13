'use client';

import { useTheme } from '@/components/shared/theme-provider';

export function ThemeOverlay() {
  const { theme } = useTheme();

  return (
    <div
      id="theme-overlay"
      className="pointer-events-none fixed inset-0 z-50 hidden"
      data-theme={theme}
      aria-hidden="true"
    />
  );
}
