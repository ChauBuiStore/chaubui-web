export function formatPrice(
  price: number,
  locale: string = 'vi',
  currency: string = 'VND',
  options?: Intl.NumberFormatOptions
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  };

  const localeMap: Record<string, string> = {
    vi: 'vi-VN',
    en: 'en-US',
    km: 'km-KH',
  };

  const formattedLocale = localeMap[locale] || 'vi-VN';

  try {
    return new Intl.NumberFormat(formattedLocale, defaultOptions).format(price);
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${price.toLocaleString('vi-VN')} ₫`;
  }
}

export function formatPriceByLocale(price: number, locale: string = 'en'): string {
  const currencyMap: Record<string, string> = {
    vi: 'VND',
    en: 'USD',
    km: 'KHR',
  };

  const currency = currencyMap[locale] || 'VND';
  return formatPrice(price, locale, currency);
}

export function formatPriceForOG(price: number, locale: string = 'vi'): string {
  const formattedPrice = price.toLocaleString('vi-VN');
  
  const currencySymbols: Record<string, string> = {
    vi: '₫',
    en: '$',
    km: '៛',
  };

  const symbol = currencySymbols[locale] || '₫';
  
  if (locale === 'vi') {
    return `${formattedPrice} ${symbol}`;
  }
  
  return `${symbol}${formattedPrice}`;
}

