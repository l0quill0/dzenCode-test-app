'use client';

import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/contexts/i18n-context';
import { useProductsQuery } from '@/hooks/use-products';

export function ProductsHeaderTitle({
  fallbackTitle,
}: {
  fallbackTitle: string;
}) {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const type = searchParams.get('type') ?? undefined;

  const { data: products } = useProductsQuery({ type });
  const title = t.products.title || fallbackTitle;
  const count = products?.length ?? 0;

  return <>{`${title} / ${count}`}</>;
}
