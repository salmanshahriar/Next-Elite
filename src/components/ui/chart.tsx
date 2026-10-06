'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
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

function Chart({
  data,
  name = 'Value',
  color = '#5c4beb',
  height = 250,
  formatValue = (value) => `${value}`,
  isLoading = false,
  className,
}: ChartProps) {
  if (isLoading) {
    return <Skeleton className={cn('w-full', className)} style={{ height }} />;
  }

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
    colors: [color],
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
      className={cn(
        'w-full',
        '[&_.apexcharts-gridline]:stroke-border [&_.apexcharts-text]:fill-muted-foreground',
        '[&_.apexcharts-tooltip]:border-border! [&_.apexcharts-tooltip]:bg-popover! [&_.apexcharts-tooltip]:shadow-md!',
        className,
      )}
      style={{ height }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={height}
      />
    </div>
  );
}

export type { ChartDataItem, ChartProps };
export { Chart };
