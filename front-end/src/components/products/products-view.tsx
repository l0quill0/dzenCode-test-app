'use client';

import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/common/data-table';
import { ErrorMessage } from '@/components/common/error-message';
import { useProductsColumns } from '@/components/products/products-columns';
import { useI18n } from '@/contexts/i18n-context';
import { useProductsQuery } from '@/hooks/use-products';

export function ProductsView() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const selectedType = searchParams.get('type') ?? undefined;

  const {
    data: products = [],
    isLoading,
    error,
  } = useProductsQuery({
    type: selectedType,
  });

  const columns = useProductsColumns();

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
      ) : products.length === 0 ? (
        <div className="rounded-[4px] border border-line bg-white p-8 text-center text-[14px] text-ink-muted">
          {t.products.noProducts}
        </div>
      ) : (
        <DataTable data={products} columns={columns} />
      )}
    </>
  );
}
