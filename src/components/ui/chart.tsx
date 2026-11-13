'use client';

import 'uplot/dist/uPlot.min.css';
import type uPlot from 'uplot';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsDarkTheme } from '@/hooks/use-is-dark-theme';
import { cn } from '@/libs/utils';

type ChartDataItem = {
  label: string;
  value: number;
};

type ChartProps = {
  data: ChartDataItem[];
  name?: string;
  color?: string;
  height?: number;
  formatValue?: (value: number) => string;
  isLoading?: boolean;
  className?: string;
};

const TICK_INTERVALS = 4;
const FONT_SIZE_PX = 11;
const PLOT_TOP_PX = 30;
const PLOT_PADDING: uPlot.Padding = [PLOT_TOP_PX, 10, 0, 0];
const X_AXIS = { size: 36, gap: 15 };
const Y_AXIS = { size: 55, gap: 9 };
const TOOLTIP_OFFSET_PX = 12;
const ARROW_HALF_PX = 4;
const ARROW_EDGE_PX = 8;
const ANIMATION_MS = 800;

const TOOLTIP_CLASS =
  'pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-md border border-border bg-popover px-3 py-2 text-popover-foreground shadow-md';
const ARROW_CLASS = {
  left: 'absolute -left-[5px] size-2 rotate-45 border-b border-l border-border bg-popover',
  right:
    'absolute -right-[5px] size-2 rotate-45 border-t border-r border-border bg-popover',
} as const;

const defaultFormatValue = (value: number) => `${value}`;

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const resolveColor = (color: string) => {
  const token = /^var\((--[\w-]+)\)$/.exec(color)?.[1];
  return token ? cssVar(token) : color;
};

const toRgb = (color: string) => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return '0, 0, 0';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `${r}, ${g}, ${b}`;
};

const niceScale = (values: number[]) => {
  if (values.length === 0) return { min: 0, max: TICK_INTERVALS, step: 1 };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const rough = (max - min || Math.abs(max) || 1) / TICK_INTERVALS;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step =
    [1, 2, 2.5, 5, 10]
      .map((multiple) => multiple * magnitude)
      .find((candidate) => candidate >= rough) ?? 10 * magnitude;
  return {
    min: Math.floor(min / step) * step,
    max: Math.ceil(max / step) * step,
    step,
  };
};

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

const tooltipPlugin = (
  data: ChartDataItem[],
  formatValue: (value: number) => string,
): uPlot.Plugin => {
  const tooltip = document.createElement('div');
  const label = document.createElement('p');
  const value = document.createElement('p');
  const arrow = document.createElement('span');
  tooltip.className = TOOLTIP_CLASS;
  label.className = 'text-sm font-semibold';
  value.className = 'mt-1 text-sm text-muted-foreground';
  tooltip.append(arrow, label, value);

  return {
    hooks: {
      init: (u) => {
        u.over.append(tooltip);
      },
      setCursor: (u) => {
        const idx = u.cursor.idx;
        const item = idx == null ? undefined : data[idx];
        const y = idx == null ? undefined : u.data[1]?.[idx];
        if (idx == null || !item || y == null) {
          tooltip.classList.add('hidden');
          return;
        }

        label.textContent = item.label;
        value.textContent = formatValue(item.value);
        tooltip.classList.remove('hidden');

        const pointX = u.valToPos(idx, 'x');
        const pointY = u.valToPos(y, 'y');
        const placeLeft =
          pointX + TOOLTIP_OFFSET_PX + tooltip.offsetWidth > u.over.clientWidth;
        arrow.className = placeLeft ? ARROW_CLASS.right : ARROW_CLASS.left;
        tooltip.style.left = `${
          placeLeft
            ? pointX - TOOLTIP_OFFSET_PX - tooltip.offsetWidth
            : pointX + TOOLTIP_OFFSET_PX
        }px`;
        const height = tooltip.offsetHeight;
        const top = Math.min(
          Math.max(pointY - height / 2, -PLOT_TOP_PX),
          u.over.clientHeight - height,
        );
        tooltip.style.top = `${top}px`;
        arrow.style.top = `${Math.min(
          Math.max(pointY - top - ARROW_HALF_PX, ARROW_EDGE_PX),
          height - ARROW_EDGE_PX - 2 * ARROW_HALF_PX,
        )}px`;
      },
    },
  };
};

function Chart({
  data,
  name = 'Value',
  color = 'var(--primary)',
  height = 250,
  formatValue = defaultFormatValue,
  isLoading = false,
  className,
}: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const isDark = useIsDarkTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = plotRef.current;
    if (!node || !isVisible || isLoading) return;

    let chart: uPlot | undefined;
    let frame = 0;
    let cancelled = false;
    const resizeObserver = new ResizeObserver(() => {
      chart?.setSize({ width: node.clientWidth, height });
    });

    void import('uplot').then(({ default: UPlot }) => {
      if (cancelled) return;

      const values = data.map((item) => item.value);
      const xs = data.map((_, index) => index);
      const scale = niceScale(values);
      const ticks = Array.from(
        { length: Math.round((scale.max - scale.min) / scale.step) + 1 },
        (_, index) => scale.min + index * scale.step,
      );
      const rgb = toRgb(resolveColor(color));
      const muted = cssVar('--muted-foreground');
      const font = `${FONT_SIZE_PX}px ${getComputedStyle(node).fontFamily}`;
      const valuesAt = (progress: number) =>
        values.map((v) => scale.min + (v - scale.min) * progress);

      const options: uPlot.Options = {
        width: node.clientWidth,
        height,
        padding: PLOT_PADDING,
        legend: { show: false },
        cursor: {
          y: false,
          move: (u, left, top) =>
            left < 0 ? [left, top] : [u.valToPos(u.posToIdx(left), 'x'), top],
          points: {
            size: 12,
            width: 2,
            fill: () => `rgb(${rgb})`,
            stroke: () => '#ffffff',
          },
        },
        scales: {
          x: {
            time: false,
            range: () => (xs.length > 1 ? [0, xs.length - 1] : [-1, 1]),
          },
          y: { range: () => [scale.min, scale.max] },
        },
        axes: [
          {
            ...X_AXIS,
            stroke: muted,
            font,
            grid: { show: false },
            ticks: { show: false },
            splits: () => xs,
            values: (_, splits) =>
              splits.map((index) => data[index]?.label ?? ''),
          },
          {
            ...Y_AXIS,
            stroke: muted,
            font,
            grid: { stroke: cssVar('--border'), width: 1 },
            ticks: { show: false },
            splits: () => ticks,
            values: (_, splits) => splits.map(formatValue),
          },
        ],
        series: [
          {},
          {
            label: name,
            stroke: 'transparent',
            width: 0,
            points: { show: false },
            paths: UPlot.paths.spline?.(),
            fill: (u) => {
              const top = u.valToPos(scale.max, 'y', true);
              const peak = u.valToPos(Math.max(...values), 'y', true);
              const bottom = u.bbox.top + u.bbox.height;
              const gradient = u.ctx.createLinearGradient(
                0,
                Number.isFinite(peak) ? peak : top,
                0,
                bottom,
              );
              gradient.addColorStop(0, `rgba(${rgb}, 0.36)`);
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0.64)');
              return gradient;
            },
          },
        ],
        plugins: [tooltipPlugin(data, formatValue)],
      };

      const animate =
        !hasAnimated.current &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      hasAnimated.current = true;

      chart = new UPlot(options, [xs, valuesAt(animate ? 0 : 1)], node);
      resizeObserver.observe(node);
      setIsReady(true);

      if (animate) {
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / ANIMATION_MS, 1);
          chart?.setData([xs, valuesAt(easeInOut(progress))]);
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      chart?.destroy();
    };
  }, [isVisible, isLoading, data, color, height, formatValue, name, isDark]);

  const showSkeleton = isLoading || !isVisible || !isReady;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={name}
      className={cn(
        'relative w-full [&_.u-cursor-x]:border-muted-foreground/40! [&_.u-over]:cursor-default!',
        className,
      )}
      style={{ height }}
    >
      {showSkeleton && <Skeleton className="absolute inset-0" />}
      <div ref={plotRef} className={cn(isLoading && 'hidden')} />
    </div>
  );
}

export type { ChartDataItem, ChartProps };
export { Chart };
