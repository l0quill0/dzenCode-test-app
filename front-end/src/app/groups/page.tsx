import { PageLayout } from '@/components/layout/page-layout';
import { getServerI18n } from '@/i18n/server';

export default async function GroupsPage() {
  const { t } = await getServerI18n();

  return <PageLayout header={t.menu.groups} />;
}
