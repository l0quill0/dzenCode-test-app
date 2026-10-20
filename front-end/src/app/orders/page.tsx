import { Plus } from 'lucide-react';
import { Button } from '@/components/common/button';
import { PageLayout } from '@/components/layout/page-layout';
import { getServerI18n } from '@/i18n/server';

export default async function OrdersPage() {
  const { t } = await getServerI18n();

  return (
    <PageLayout
      header={`${t.orders.title} / 0`}
      leadingAction={
        <Button
          variant="primary"
          shape="circle"
          size="icon-md"
          className="border-[3px] border-brand-strong/30 shadow-[0_2px_6px_color-mix(in_srgb,var(--color-brand)_45%,transparent)] transition-transform hover:scale-105"
          title={t.orders.newOrder}
        >
          <Plus className="h-4 w-4 stroke-[3]" />
        </Button>
      }
    />
  );
}
