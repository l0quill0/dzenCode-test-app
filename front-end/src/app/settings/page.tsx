import { PageLayout } from '@/components/layout/page-layout';
import { LanguageSwitcher } from '@/components/settings/language-switcher';
import { AccountSettings } from '@/components/settings/account-settings';
import { getServerI18n } from '@/i18n/server';

export default async function SettingsPage() {
  const { t } = await getServerI18n();

  return (
    <PageLayout header={t.menu.settings} className="w-full max-w-[640px]">
      <LanguageSwitcher />
      <AccountSettings />
    </PageLayout>
  );
}
