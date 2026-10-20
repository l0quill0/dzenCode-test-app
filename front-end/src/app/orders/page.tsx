import React from 'react';
import { Plus } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { getServerI18n } from '@/i18n/server';

export default async function OrdersPage() {
  const { t } = await getServerI18n();

  return (
    <PageLayout
      header={`${t.orders.title} / 0`}
      leadingAction={
        <button
          type="button"
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-[3px] border-[#7cb342]/30 bg-[#8bc34a] text-white shadow-[0_2px_6px_rgba(139,195,74,0.45)] transition-transform hover:scale-105"
          title={t.orders.newOrder}
        >
          <Plus className="h-4 w-4 stroke-[3]" />
        </button>
      }
    />
  );
}
