'use client';

import { cn } from '@/libs/utils';
import { useEffect, useState } from 'react';

type DynamicChartProps = {
  label: string;
  value: number;
  delay?: number;
  className?: string;
  strokeClassName?: string;
};

const CHART_GLOW_STYLE = {
  filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.45))',
} as const;

function DynamicChart({
  label,
  value,
  delay = 0,
  className,
  strokeClassName = 'stroke-success',
}: DynamicChartProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const startAnimation = () => {
      timeoutId = setTimeout(() => {
        let current = 0;
        intervalId = setInterval(() => {
          current += 2;
          if (current >= clampedValue) {
            setDisplayValue(clampedValue);
            if (intervalId) clearInterval(intervalId);
          } else {
            setDisplayValue(current);
          }
        }, 15);
      }, delay);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(startAnimation);
    } else {
      startAnimation();
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [clampedValue, delay]);

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1.5 select-none sm:gap-3',
        className,
      )}
    >
      <div className="xs:h-24 xs:w-24 relative h-20 w-20 sm:h-36 sm:w-36">
        <svg
          className="h-full w-full rotate-[-90deg]"
          viewBox="0 0 144 144"
          aria-hidden="true"
        >
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="var(--border)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={CHART_GLOW_STYLE}
            className={cn(
              'text-success transition-all duration-75 ease-out',
              strokeClassName,
            )}
          />
        </svg>
        <span className="xs:text-2xl absolute inset-0 flex items-center justify-center text-xl font-black text-success sm:text-4xl">
          {displayValue}
        </span>
      </div>
      <span className="xs:text-xs text-center text-[10px] font-medium text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export { DynamicChart };
