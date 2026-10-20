import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { ProductsFilters } from '@/components/products/products-filters';
import { ProductsHeaderTitle } from '@/components/products/products-header-title';
import { ProductsView } from '@/components/products/products-view';
import { getServerI18n } from '@/i18n/server';

export default async function ProductsPage() {
  const { t } = await getServerI18n();

  return (
    <PageLayout
      header={
        <Suspense fallback={`${t.products.title} / 0`}>
          <ProductsHeaderTitle fallbackTitle={t.products.title} />
        </Suspense>
      }
      headerExtras={
        <Suspense fallback={null}>
          <ProductsFilters />
        </Suspense>
      }
      className="w-full"
    >
      <Suspense fallback={null}>
        <ProductsView />
      </Suspense>
    </PageLayout>
  );
}
