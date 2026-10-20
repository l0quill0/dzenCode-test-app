'use client';

import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Monitor } from 'lucide-react';
import { appTableFeatures } from '@/components/common/data-table';
import {
  DotCell,
  IconCell,
  LabeledRowsCell,
  StackedCell,
  TextCell,
} from '@/components/common/table-cells';
import { ProductDeleteActionCell } from '@/components/products/product-cells';
import { useI18n } from '@/contexts/i18n-context';
import {
  formatFullDate,
  formatNumericDate,
  formatPrice,
  formatShortDate,
  getSortedPrices,
} from '@/lib/format';
import type { Product } from '@/types';

const columnHelper = createColumnHelper<typeof appTableFeatures, Product>();

const linkTextClassName = 'max-w-[220px] min-w-[160px]';

export function useProductsColumns() {
  const { t } = useI18n();

  return useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: 'statusDot',
          cell: ({ row }) => <DotCell active={row.original.status === 'FREE'} />,
        }),
        columnHelper.display({
          id: 'photo',
          cell: () => <IconCell icon={Monitor} />,
        }),
        columnHelper.accessor('title', {
          cell: ({ row }) => (
            <StackedCell
              primary={row.original.title}
              secondary={row.original.serialNumber}
              underline
              className="min-w-[260px]"
            />
          ),
        }),
        columnHelper.accessor('status', {
          cell: ({ getValue }) => {
            const isFree = getValue() === 'FREE';
            return (
              <TextCell
                value={isFree ? t.products.statusFree : t.products.statusInRepair}
                tone={isFree ? 'brand' : 'strong'}
              />
            );
          },
        }),
        columnHelper.display({
          id: 'guarantee',
          cell: ({ row }) => (
            <LabeledRowsCell
              className="min-w-[135px]"
              rows={[
                {
                  label: t.products.from,
                  value: formatNumericDate(row.original.guaranteeStart),
                },
                {
                  label: t.products.to,
                  value: formatNumericDate(row.original.guaranteeEnd),
                },
              ]}
            />
          ),
        }),
        columnHelper.accessor('isNew', {
          cell: ({ getValue }) => (
            <TextCell
              value={getValue() === 1 ? t.products.isNew : t.products.isUsed}
            />
          ),
        }),
        columnHelper.display({
          id: 'price',
          cell: ({ row }) => {
            const { defaultPrice, secondaryPrice } = getSortedPrices(
              row.original.price,
            );
            return (
              <StackedCell
                primary={formatPrice(defaultPrice)}
                secondary={formatPrice(secondaryPrice)}
                secondaryPosition="above"
              />
            );
          },
        }),
        columnHelper.display({
          id: 'group',
          cell: ({ row }) => (
            <TextCell
              value={row.original.group?.name}
              underline
              wrap
              className={linkTextClassName}
            />
          ),
        }),
        columnHelper.display({
          id: 'user',
          cell: ({ row }) => (
            <TextCell
              value={row.original.user?.name}
              underline
              wrap
              className={linkTextClassName}
            />
          ),
        }),
        columnHelper.display({
          id: 'order',
          cell: ({ row }) => (
            <TextCell
              value={row.original.order?.title}
              underline
              wrap
              className="max-w-[240px] min-w-[180px]"
            />
          ),
        }),
        columnHelper.accessor('date', {
          cell: ({ getValue }) => (
            <StackedCell
              primary={formatFullDate(getValue(), t.months)}
              secondary={formatShortDate(getValue())}
              secondaryPosition="above"
              align="center"
            />
          ),
        }),
        columnHelper.display({
          id: 'actions',
          cell: ({ row }) => <ProductDeleteActionCell product={row.original} />,
        }),
      ]),
    [t],
  );
}
