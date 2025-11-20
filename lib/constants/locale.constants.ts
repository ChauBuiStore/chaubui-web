export const LOCALES = {
  VI: 'vi',
  EN: 'en',
  KM: 'km'
} as const;

export const LOCALE_LIST = [LOCALES.VI, LOCALES.EN, LOCALES.KM] as const;

export type Locale = (typeof LOCALE_LIST)[number];

export const DEFAULT_LOCALE: Locale = LOCALES.EN;

export const LOCALE_NAMES: Record<Locale, string> = {
  [LOCALES.VI]: 'VN',
  [LOCALES.EN]: 'EN',
  [LOCALES.KM]: 'KH'
};
