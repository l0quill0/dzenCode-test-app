import { cookies } from 'next/headers';
import {
  dictionaries,
  type Dictionary,
  type Locale,
} from '@/i18n/dictionaries';

export const LOCALE_COOKIE = 'dzencode_locale';

export async function getServerI18n(): Promise<{
  locale: Locale;
  t: Dictionary;
}> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = raw === 'en' || raw === 'ru' ? raw : 'ru';

  return {
    locale,
    t: dictionaries[locale],
  };
}
