import { LOCALE_LIST, DEFAULT_LOCALE, type Locale } from '@/lib/constants';

export const locales = LOCALE_LIST;
export type { Locale };

export const defaultLocale = DEFAULT_LOCALE;

export function isValidLocale(locale: string): locale is Locale {
  return locales.some(validLocale => validLocale === locale);
}
