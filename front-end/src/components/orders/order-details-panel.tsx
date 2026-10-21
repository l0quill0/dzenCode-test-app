'use client';

import { useState } from 'react';
import { Monitor, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/common/button';
import { DeleteModal } from '@/components/common/delete-modal';
import {
  DotCell,
  IconCell,
  StackedCell,
  TextCell,
} from '@/components/common/table-cells';
import { useI18n } from '@/contexts/i18n-context';
import { useDeleteProductMutation } from '@/hooks/use-products';
import type { Order, Product } from '@/types';

export interface OrderDetailsPanelProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailsPanel({ order, onClose }: OrderDetailsPanelProps) {
  const { t } = useI18n();
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const deleteProductMutation = useDeleteProductMutation();

  const handleConfirmDeleteProduct = async () => {
    if (!deletingProduct) return;
    await deleteProductMutation.mutateAsync(deletingProduct.id);
    setDeletingProduct(null);
  };

  const products = order.products ?? [];

  return (
    <>
      <div className="animate__animated animate__fadeIn relative flex min-w-0 flex-1 flex-col rounded-[4px] border border-line bg-white p-7 shadow-sm">
        <Button
          variant="secondary"
          shape="circle"
          size="icon-md"
          onClick={onClose}
          aria-label={t.actions.close}
          className="absolute top-0 right-0 z-10 -translate-y-1/2 translate-x-1/2 border-line text-ink-muted shadow-md hover:bg-white"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </Button>

        <h2 className="text-[20px] font-bold text-ink leading-snug">
          {order.title}
        </h2>

        <div>
          <Button
            variant="link"
            size="auto"
            shape="none"
            className="group mt-3 mb-5 gap-2 text-[13px] font-semibold text-brand"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:scale-105">
              <Plus className="h-3 w-3 stroke-[3]" />
            </span>
            <span>{t.orders.addProduct}</span>
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {products.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-ink-muted">
              {t.orders.emptyProductsInOrder}
            </div>
          ) : (
            <div className="flex flex-col">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-t border-line-soft py-3 px-1 transition-colors hover:bg-surface-soft/60"
                >
                  <DotCell active={product.status === 'FREE'} />
                  <IconCell icon={Monitor} />
                  <StackedCell
                    primary={product.title}
                    secondary={product.serialNumber}
                    underline
                    className="min-w-[240px] flex-1"
                  />
                  <TextCell
                    value={
                      product.status === 'FREE'
                        ? t.products.statusFree
                        : t.products.statusInRepair
                    }
                    tone={product.status === 'FREE' ? 'brand' : 'strong'}
                    className="min-w-[90px]"
                  />
                  <Button
                    variant="ghost-danger"
                    shape="circle"
                    size="icon-sm"
                    onClick={() => setDeletingProduct(product)}
                    aria-label={t.actions.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={Boolean(deletingProduct)}
        title={t.products.deleteConfirmTitle}
        isDeleting={deleteProductMutation.isPending}
        onCancel={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDeleteProduct}
      >
        {deletingProduct && (
          <div className="flex items-center gap-5">
            <DotCell active={deletingProduct.status === 'FREE'} />
            <IconCell icon={Monitor} />
            <StackedCell
              primary={deletingProduct.title}
              secondary={deletingProduct.serialNumber}
              underline
            />
          </div>
        )}
      </DeleteModal>
    </>
  );
}
