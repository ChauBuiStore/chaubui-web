export function formatOrderDate(dateString: string, locale: string = "vi-VN"): string {
  return new Date(dateString).toLocaleDateString(locale);
}

