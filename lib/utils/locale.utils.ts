export function transformLocaleFields<T>(data: T[], locale: string): T[];

export function transformLocaleFields<T>(data: T, locale: string): T;

export function transformLocaleFields(
  data: null | undefined,
  locale: string
): null;

export function transformLocaleFields<T = unknown>(
  data: T | T[] | null | undefined,
  locale: string
): T | T[] | null {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => transformLocaleFields(item, locale)) as T[];
  }

  if (typeof data !== "object") {
    return data;
  }

  const dataObj = data as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  const capitalizedLocale =
    locale.charAt(0).toUpperCase() + locale.slice(1).toLowerCase();

  Object.keys(dataObj).forEach((key) => {
    const value = dataObj[key];

    if (value !== null && typeof value === "object") {
      result[key] = transformLocaleFields(value, locale);
    } else {
      result[key] = value;
    }
  });

  const localeFields = Object.keys(dataObj).filter((key) => key.endsWith("En"));

  localeFields.forEach((enField) => {
    const baseField = enField.slice(0, -2);
    const localeField = `${baseField}${capitalizedLocale}`;

    if (dataObj[localeField] !== undefined) {
      result[baseField] = dataObj[localeField];
    } else if (dataObj[enField] !== undefined) {
      result[baseField] = dataObj[enField];
    }
  });

  return result as T;
}

export function getLocalizedField(
  item: Record<string, unknown>,
  fieldName: string,
  locale: string
): string {
  const capitalizedLocale =
    locale.charAt(0).toUpperCase() + locale.slice(1).toLowerCase();
  const localeField = `${fieldName}${capitalizedLocale}`;

  if (item[localeField]) {
    return String(item[localeField]);
  }

  if (item[`${fieldName}En`]) {
    return String(item[`${fieldName}En`]);
  }

  return item[fieldName] ? String(item[fieldName]) : "";
}
