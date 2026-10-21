import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/common/button';
import { PageLayout } from '@/components/layout/page-layout';
import { OrdersHeaderTitle } from '@/components/orders/orders-header-title';
import { OrdersView } from '@/components/orders/orders-view';
import { getServerI18n } from '@/i18n/server';

export default async function OrdersPage() {
  const { t } = await getServerI18n();

  return (
    <PageLayout
      leadingAction={
        <Button
          variant="primary"
          shape="circle"
          size="icon-md"
          className="border-[3px] border-brand-strong/30 transition-transform hover:scale-105"
          title={t.orders.newOrder}
        >
          <Plus className="h-4 w-4 stroke-[3]" />
        </Button>
      }
      header={
        <Suspense fallback={<span>{t.orders.title}</span>}>
          <OrdersHeaderTitle fallbackTitle={t.orders.title} />
        </Suspense>
      }
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-brand" />
          </div>
        }
      >
        <OrdersView />
      </Suspense>
    </PageLayout>
  );
}
