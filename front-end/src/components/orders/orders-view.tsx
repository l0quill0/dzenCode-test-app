'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/common/data-table';
import { ErrorMessage } from '@/components/common/error-message';
import { OrderDetailsPanel } from '@/components/orders/order-details-panel';
import { useOrdersColumns } from '@/components/orders/orders-columns';
import { OrdersCompactList } from '@/components/orders/orders-compact-list';
import { useI18n } from '@/contexts/i18n-context';
import { useOrdersQuery } from '@/hooks/use-orders';
import type { Order } from '@/types';

export function OrdersView() {
  const { t } = useI18n();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const { data: orders = [], isLoading, error } = useOrdersQuery();

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selectedOrderId) ?? null,
    [orders, selectedOrderId],
  );

  const handleToggleOrder = (order: Order) => {
    setSelectedOrderId((prev) => (prev === order.id ? null : order.id));
  };

  const columns = useOrdersColumns({
    onSelectOrder: handleToggleOrder,
  });

  return (
    <>
      <ErrorMessage
        message={error instanceof Error ? error.message : null}
        className="mb-4"
      />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-brand" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[4px] border border-line bg-white p-8 text-center text-[14px] text-ink-muted">
          {t.orders.noOrders}
        </div>
      ) : selectedOrderId !== null && selectedOrder ? (
        <div className="flex min-h-0 flex-1 flex-col md:flex-row gap-6 pt-4 pb-2 md:pr-5">
          <div className="hidden md:flex shrink-0">
            <OrdersCompactList
              orders={orders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={handleToggleOrder}
            />
          </div>
          <OrderDetailsPanel
            order={selectedOrder}
            onClose={() => setSelectedOrderId(null)}
          />
        </div>
      ) : (
        <DataTable data={orders} columns={columns} />
      )}
    </>
  );
}
