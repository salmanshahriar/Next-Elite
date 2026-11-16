'use client';

import {
  type ColumnDef,
  type OnChangeFn,
  type RowData,
  type SortingState,
  createSortedRowModel,
  flexRender,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  CaretUpDownIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/libs/utils';

type DataTablePagination = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
};

type DataTableProps<TData extends RowData> = {
  data: TData[];
  columns: DataTableColumnDef<TData>[];
  isLoading?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  pagination?: DataTablePagination;
  emptyMessage?: React.ReactNode;
  className?: string;
};

const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
});

type DataTableColumnDef<TData extends RowData> = ColumnDef<
  typeof dataTableFeatures,
  TData
>;

const SORT_ICONS = {
  asc: CaretUpIcon,
  desc: CaretDownIcon,
} as const;

function DataTable<TData extends RowData>({
  data,
  columns,
  isLoading = false,
  sorting: controlledSorting,
  onSortingChange,
  pagination,
  emptyMessage,
  className,
}: DataTableProps<TData>) {
  const t = useTranslations('common');
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const sorting = controlledSorting ?? internalSorting;
  const resolvedEmptyMessage = emptyMessage ?? t('noData');

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
    state: { sorting },
    onSortingChange: onSortingChange ?? setInternalSorting,
  });

  if (isLoading) {
    return (
      <div
        role="status"
        className="flex h-40 items-center justify-center gap-2 text-sm text-muted-foreground"
      >
        <Spinner aria-hidden />
        {t('loading')}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        role="status"
        className="flex h-40 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
      >
        <WarningIcon className="size-8" aria-hidden />
        {resolvedEmptyMessage}
      </div>
    );
  }

  return (
    <div data-slot="data-table" className={cn('space-y-4', className)}>
      <Table aria-label={t('table')}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return <TableHead key={header.id} />;
                }

                const label = flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                );

                if (!header.column.getCanSort()) {
                  return (
                    <TableHead key={header.id} className="px-4">
                      {label}
                    </TableHead>
                  );
                }

                const sortDirection = header.column.getIsSorted();
                const SortIcon = sortDirection
                  ? SORT_ICONS[sortDirection]
                  : CaretUpDownIcon;

                return (
                  <TableHead
                    key={header.id}
                    className="px-4"
                    aria-sort={
                      sortDirection === 'asc'
                        ? 'ascending'
                        : sortDirection === 'desc'
                          ? 'descending'
                          : 'none'
                    }
                  >
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="-mx-1 inline-flex cursor-pointer items-center gap-1 rounded px-1 hover:text-foreground"
                    >
                      {label}
                      <SortIcon
                        className={cn(
                          'size-3.5',
                          !sortDirection && 'text-muted-foreground/50',
                        )}
                      />
                    </button>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="even:bg-muted/40">
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && <DataTablePager {...pagination} />}
    </div>
  );
}

function DataTablePager({
  total,
  page,
  limit,
  onPageChange,
}: DataTablePagination) {
  const t = useTranslations('common');
  const pageCount = Math.max(1, Math.ceil(total / limit));
  if (pageCount <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>{t('showingRange', { from, to, total })}</p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label={t('previousPage')}
        >
          <CaretLeftIcon />
        </Button>
        <span className="tabular-nums">
          {page} / {pageCount}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label={t('nextPage')}
        >
          <CaretRightIcon />
        </Button>
      </div>
    </div>
  );
}

export type { DataTableColumnDef, DataTablePagination, DataTableProps };
export { DataTable };
