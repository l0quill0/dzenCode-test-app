'use client';

import { type MouseEvent, useState } from 'react';
import { List, Monitor, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/button';
import { DeleteModal } from '@/components/common/delete-modal';
import { DotCell, IconCell, StackedCell } from '@/components/common/table-cells';
import { useI18n } from '@/contexts/i18n-context';
import { useDeleteOrderMutation } from '@/hooks/use-orders';
import type { Order } from '@/types';

export function OrderListIconButton({
  onClick,
  ariaLabel = 'Order details',
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}) {
  return (
    <Button
      variant="secondary"
      shape="circle"
      size="icon-md"
      onClick={onClick}
      aria-label={ariaLabel}
      className="border-line text-ink-muted hover:border-ink-soft hover:text-ink"
    >
      <List className="h-4 w-4" />
    </Button>
  );
}

export function OrderDeleteActionCell({ order }: { order: Order }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = useDeleteOrderMutation();

  const handleConfirmDelete = async () => {
    await deleteMutation.mutateAsync(order.id);
    setIsOpen(false);
  };

  const products = order.products ?? [];

  return (
    <>
      <Button
        variant="ghost-danger"
        shape="circle"
        size="icon-sm"
        onClick={() => setIsOpen(true)}
        aria-label={t.actions.delete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <DeleteModal
        isOpen={isOpen}
        title={t.orders.deleteConfirmTitle}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        <div className="flex flex-col divide-y divide-line-soft">
          {products.length === 0 ? (
            <div className="py-4 text-[13px] text-ink-muted">
              {t.orders.emptyProductsInOrder}
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-5 py-3 first:pt-0 last:pb-0"
              >
                <DotCell active={product.status === 'FREE'} />
                <IconCell icon={Monitor} />
                <StackedCell
                  primary={product.title}
                  secondary={product.serialNumber}
                  underline
                />
              </div>
            ))
          )}
        </div>
      </DeleteModal>
    </>
  );
}
