export function getFirstLetter(name?: string, fallback: string = 'U'): string {
  if (!name || name.trim().length === 0) {
    return fallback.toUpperCase();
  }

  return name.trim().charAt(0).toUpperCase();
}

export function getFullName(firstName?: string, lastName?: string): string {
  const first = firstName?.trim() || '';
  const last = lastName?.trim() || '';

  if (!first && !last) {
    return '';
  }

  return `${first} ${last}`.trim();
}
