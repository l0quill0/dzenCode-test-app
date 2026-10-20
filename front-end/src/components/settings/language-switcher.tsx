'use client';

import { Button } from '@/components/common/button';
import { useI18n } from '@/contexts/i18n-context';

export function LanguageSwitcher() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="flex items-center justify-between rounded-[4px] border border-line bg-white px-8 py-5">
      <span className="text-[14px] font-semibold text-ink">
        {t.settings.languageLabel}
      </span>

      <div className="flex items-center gap-3">
        <Button
          variant={locale === 'ru' ? 'primary' : 'secondary'}
          shape="rounded"
          size="sm"
          onClick={() => setLocale('ru')}
        >
          {t.settings.russian}
        </Button>
        <Button
          variant={locale === 'en' ? 'primary' : 'secondary'}
          shape="rounded"
          size="sm"
          onClick={() => setLocale('en')}
        >
          {t.settings.english}
        </Button>
      </div>
    </div>
  );
}
