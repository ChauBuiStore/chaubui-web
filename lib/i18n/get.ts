import type { Locale } from "./config";
import viMessages from "../../messages/vi.json";
import enMessages from "../../messages/en.json";
import kmMessages from "../../messages/km.json";

type TranslationKey = string;
type Messages = Record<string, unknown>;

const messagesCache: Record<Locale, Messages> = {} as Record<Locale, Messages>;
const messagesPromises: Partial<Record<Locale, Promise<Messages>>> = {};

function getCachedMessages(locale: Locale) {
  if (messagesCache[locale]) {
    return messagesCache[locale];
  }

  if (messagesPromises[locale]) {
    throw new Error("Messages are being loaded asynchronously. Use getTranslation() for async operations.");
  }

  let messages: Messages;
  switch (locale) {
    case "vi":
      messages = viMessages as Messages;
      break;
    case "en":
      messages = enMessages as Messages;
      break;
    case "km":
      messages = kmMessages as Messages;
      break;
    default:
      messages = viMessages as Messages;
  }

  messagesCache[locale] = messages;
  return messages;
}

async function getMessagesAsync(locale: Locale) {
  if (messagesCache[locale]) {
    return messagesCache[locale];
  }

  if (messagesPromises[locale] !== undefined) {
    return messagesPromises[locale]!;
  }

  const promise = (async () => {
    let messages: Messages;
    switch (locale) {
      case "vi":
        messages = (await import("../../messages/vi.json")).default;
        break;
      case "en":
        messages = (await import("../../messages/en.json")).default;
        break;
      case "km":
        messages = (await import("../../messages/km.json")).default;
        break;
      default:
        messages = (await import("../../messages/vi.json")).default;
    }
    messagesCache[locale] = messages;
    return messages;
  })();

  messagesPromises[locale] = promise;
  return promise;
}

export async function getTranslation(
  key: TranslationKey,
  locale: Locale = "vi"
): Promise<string> {
  try {
    const messages = await getMessagesAsync(locale);

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
  try {
    const messages = getCachedMessages(locale);

    const keys = key.split(".");
    let value: unknown = messages;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    let message = typeof value === "string" ? value : key;

    if (params && typeof message === "string") {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        message = message.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
      });
    }

    return message;
  } catch (error) {
    console.error(`Translation error for key "${key}" in locale "${locale}":`, error);
    return key;
  }
}

