'use client';

import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@/components/common/button';
import { appTableFeatures } from '@/components/common/data-table';
import { StackedCell, TextCell } from '@/components/common/table-cells';
import {
  OrderDeleteActionCell,
  OrderListIconButton,
} from '@/components/orders/order-cells';
import { useI18n } from '@/contexts/i18n-context';
import {
  formatFullDate,
  formatPrice,
  formatShortDate,
  getOrderTotalPrices,
  getProductsCountLabel,
} from '@/lib/format';
import type { Order } from '@/types';

const columnHelper = createColumnHelper<typeof appTableFeatures, Order>();

export interface UseOrdersColumnsOptions {
  onSelectOrder?: (order: Order) => void;
}

export function useOrdersColumns({
  onSelectOrder,
}: UseOrdersColumnsOptions = {}) {
  const { t } = useI18n();

  return useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('title', {
          cell: ({ row }) => (
            <Button
              variant="plain"
              shape="none"
              size="auto"
              onClick={() => onSelectOrder?.(row.original)}
              className="group cursor-pointer text-left font-normal"
            >
              <TextCell
                value={row.original.title}
                underline
                wrap
                className="max-w-[440px] min-w-[280px] transition-colors group-hover:text-ink-strong group-hover:decoration-ink-strong hover:text-ink-strong hover:decoration-ink-strong"
              />
            </Button>
          ),
        }),
        columnHelper.display({
          id: 'listIcon',
          cell: ({ row }) => (
            <OrderListIconButton
              onClick={() => onSelectOrder?.(row.original)}
            />
          ),
        }),
        columnHelper.display({
          id: 'productsCount',
          cell: ({ row }) => {
            const count = row.original.products?.length ?? 0;
            const label = getProductsCountLabel(count, {
              one: t.orders.productsCountOne,
              few: t.orders.productsCount,
              many: t.orders.productsCountMany,
            });
            return <StackedCell primary={count} secondary={label} />;
          },
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
          id: 'price',
          cell: ({ row }) => {
            const { defaultPrice, secondaryPrice } = getOrderTotalPrices(
              row.original.products,
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
          id: 'actions',
          cell: ({ row }) => <OrderDeleteActionCell order={row.original} />,
        }),
      ]),
    [t, onSelectOrder],
  );
}
