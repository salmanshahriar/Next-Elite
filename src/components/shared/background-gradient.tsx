import type { ReactNode } from 'react';

export function BackgroundGradient(): ReactNode {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-linear-to-r from-violet-100 via-violet-50/55 to-white dark:from-[#09090b] dark:via-[#0f0f14] dark:to-[#0c0c0e]" />
      <div className="absolute top-0 right-0 hidden h-[min(600px,70vh)] w-[min(700px,55vw)] bg-[radial-gradient(circle_at_top_right,rgb(233_213_255),transparent_70%)] md:block dark:bg-[radial-gradient(circle_at_top_right,rgba(118,99,255,0.12),transparent_70%)]" />
      <div className="absolute top-0 right-0 h-[250px] w-[250px] bg-[radial-gradient(circle_at_top_right,rgb(233_213_255/0.5),transparent_70%)] md:hidden dark:bg-[radial-gradient(circle_at_top_right,rgba(118,99,255,0.08),transparent_70%)]" />
    </div>
  );
}
