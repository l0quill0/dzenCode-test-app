'use client';

import { ChevronRight } from 'lucide-react';
import { StackedCell } from '@/components/common/table-cells';
import { OrderListIconButton } from '@/components/orders/order-cells';
import { useI18n } from '@/contexts/i18n-context';
import {
  formatFullDate,
  formatShortDate,
  getProductsCountLabel,
} from '@/lib/format';
import type { Order } from '@/types';

export interface OrdersCompactListProps {
  orders: Order[];
  selectedOrderId: number;
  onSelectOrder: (order: Order) => void;
}

export function OrdersCompactList({
  orders,
  selectedOrderId,
  onSelectOrder,
}: OrdersCompactListProps) {
  const { t } = useI18n();

  return (
    <div className="flex w-full md:w-[380px] shrink-0 flex-col gap-2.5 overflow-y-auto pb-4">
      {orders.map((order) => {
        const isSelected = order.id === selectedOrderId;
        const count = order.products?.length ?? 0;
        const label = getProductsCountLabel(count, {
          one: t.orders.productsCountOne,
          few: t.orders.productsCount,
          many: t.orders.productsCountMany,
        });

        return (
          <div
            key={order.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectOrder(order)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectOrder(order);
              }
            }}
            className="group relative flex cursor-pointer items-center rounded-[4px] border border-line bg-white py-3 pr-10 pl-5 transition-shadow hover:shadow-md focus:outline-none"
          >
            <div className="flex items-center gap-5">
              <OrderListIconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOrder(order);
                }}
              />
              <div className="w-[80px] shrink-0">
                <StackedCell primary={count} secondary={label} />
              </div>
              <div className="shrink-0">
                <StackedCell
                  primary={formatFullDate(order.date, t.months)}
                  secondary={formatShortDate(order.date)}
                  secondaryPosition="above"
                  align="center"
                />
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-0 right-0 bottom-0 flex w-8 items-center justify-center rounded-r-[3px] bg-line">
                <ChevronRight
                  className="h-5 w-5 text-white"
                  strokeWidth={2.5}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
