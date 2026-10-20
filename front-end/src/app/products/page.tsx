import React from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { getServerI18n } from '@/i18n/server';

export default async function ProductsPage() {
  const { t } = await getServerI18n();

  return <PageLayout header={`${t.products.title} / 0`} className="w-full" />;
}
