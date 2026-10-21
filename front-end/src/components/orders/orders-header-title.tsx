'use client';

import { useI18n } from '@/contexts/i18n-context';
import { useOrdersQuery } from '@/hooks/use-orders';

export function OrdersHeaderTitle({
  fallbackTitle = 'Приходы',
}: {
  fallbackTitle?: string;
}) {
  const { t } = useI18n();
  const { data: orders } = useOrdersQuery();
  const title = t.orders.title || fallbackTitle;
  const count = orders?.length ?? 0;

  return <>{`${title} / ${count}`}</>;
}
