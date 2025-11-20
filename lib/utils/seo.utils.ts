export function truncateMetaText(text: string, maxLength: number = 160): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  let truncated = text.substring(0, maxLength);

  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.8) {
    truncated = truncated.substring(0, lastSpace);
  }

  return truncated.trim() + "...";
}

export function truncateTitle(title: string, maxLength: number = 60): string {
  return truncateMetaText(title, maxLength);
}

export function truncateDescription(
  description: string,
  maxLength: number = 160
): string {
  return truncateMetaText(description, maxLength);
}

