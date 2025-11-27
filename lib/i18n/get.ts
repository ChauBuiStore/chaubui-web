import type { Locale } from "./config";
import viMessages from "../../messages/vi.json";
import enMessages from "../../messages/en.json";
import kmMessages from "../../messages/km.json";

type TranslationKey = string;
type Messages = typeof viMessages;

const messagesMap: Record<Locale, Messages> = {
  vi: viMessages,
  en: enMessages,
  km: kmMessages,
};

export function getTranslation(
  key: TranslationKey,
  locale: Locale = "vi"
): string {
  try {
    const messages = messagesMap[locale] || messagesMap.vi;

    const keys = key.split(".");
    let value: unknown = messages;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  } catch (error) {
    console.error(`Translation error for key "${key}" in locale "${locale}":`, error);
    return key;
  }
}

export function t(
  key: TranslationKey,
  params: Record<string, string | number> = {},
  locale: Locale = "vi"
): string {
  let message = getTranslation(key, locale);

  if (params && typeof message === "string") {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      message = message.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
    });
  }

  return message;
}

