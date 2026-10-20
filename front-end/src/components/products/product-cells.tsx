'use client';

import { useState } from 'react';
import { Monitor, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/button';
import { DeleteModal } from '@/components/common/delete-modal';
import { DotCell, IconCell, StackedCell } from '@/components/common/table-cells';
import { useI18n } from '@/contexts/i18n-context';
import { useDeleteProductMutation } from '@/hooks/use-products';
import type { Product } from '@/types';

export function ProductDeleteActionCell({ product }: { product: Product }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = useDeleteProductMutation();

  const handleConfirmDelete = async () => {
    await deleteMutation.mutateAsync(product.id);
    setIsOpen(false);
  };

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
        title={t.products.deleteConfirmTitle}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        <DotCell active={product.status === 'FREE'} />
        <IconCell icon={Monitor} />
        <StackedCell
          primary={product.title}
          secondary={product.serialNumber}
          underline
        />
      </DeleteModal>
    </>
  );
}
