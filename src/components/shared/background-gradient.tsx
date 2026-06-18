import type { ReactNode } from 'react';

export function BackgroundGradient(): ReactNode {
  return (
    <div aria-hidden className="page-gradient page-gradient--fixed">
      <div className="page-gradient__layer page-gradient__base" />
      <div className="page-gradient__layer page-gradient__right-top" />
      <div className="page-gradient__layer page-gradient__right-bottom" />
      <div className="page-gradient__layer page-gradient__left-primary" />
      <div className="page-gradient__layer page-gradient__left-soft" />
    </div>
  );
}
