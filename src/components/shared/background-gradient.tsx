import type { ReactNode } from 'react';

export function BackgroundGradient(): ReactNode {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[var(--page-chrome)]" />
      <div className="absolute inset-0 bg-linear-to-b from-violet-100/70 via-violet-50/25 to-[var(--page-chrome)] dark:from-[#0f0f14] dark:via-[#0c0c0e] dark:to-[#09090b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgb(233_213_255/0.55),transparent_62%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(118,99,255,0.14),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_100%,rgb(237_233_254/0.45),transparent_58%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(90,74,212,0.08),transparent_58%)]" />
    </div>
  );
}
