'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsDarkTheme } from '@/hooks/use-is-dark-theme';
import { cn } from '@/libs/utils';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

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

const resolveColor = (color: string) => {
  const token = /^var\((--[\w-]+)\)$/.exec(color)?.[1];
  return token
    ? getComputedStyle(document.documentElement).getPropertyValue(token).trim()
    : color;
};

function Chart({
  data,
  name = 'Value',
  color = 'var(--primary)',
  height = 250,
  formatValue = (value) => `${value}`,
  isLoading = false,
  className,
}: ChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useIsDarkTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [resolvedColor, setResolvedColor] = useState<string | null>(null);

  useEffect(() => {
    setResolvedColor(resolveColor(color));
  }, [color, isDark]);

  useEffect(() => {
    const node = ref.current;
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

  const series = [{ name, data: data.map((d) => d.value) }];

  const options: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: 'inherit',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.8,
        stops: [0, 100],
        type: 'vertical',
      },
    },
    colors: resolvedColor ? [resolvedColor] : undefined,
    xaxis: {
      categories: data.map((d) => d.label),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: '11px' } },
    },
    yaxis: {
      labels: {
        style: { fontSize: '11px' },
        formatter: formatValue,
      },
    },
    grid: {
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }) => `
        <div class="bg-popover px-3 py-2 text-popover-foreground">
          <p class="m-0 text-sm font-semibold">${data[dataPointIndex]?.label ?? ''}</p>
          <p class="m-0 mt-1 text-sm text-muted-foreground">${formatValue(series[seriesIndex]?.[dataPointIndex] ?? 0)}</p>
        </div>`,
    },
  };

  return (
    <div
      ref={ref}
      className={cn(
        'w-full',
        '[&_.apexcharts-gridline]:stroke-border [&_.apexcharts-text]:fill-muted-foreground',
        '[&_.apexcharts-tooltip]:border-border! [&_.apexcharts-tooltip]:bg-popover! [&_.apexcharts-tooltip]:shadow-md!',
        className,
      )}
      style={{ height }}
    >
      {isLoading || !isVisible || !resolvedColor ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={height}
        />
      )}
    </div>
  );
}

export type { ChartDataItem, ChartProps };
export { Chart };
