"use client";

import { XDropdownMenu, type XDropdownMenuItem } from '@/components/common';
import { LOCALE_LIST, LOCALE_NAMES, type Locale } from '@/lib/constants';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';

export function Language() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const languageItems: XDropdownMenuItem[] = LOCALE_LIST.map((loc) => ({
    id: loc,
    label: LOCALE_NAMES[loc],
    onClick: () => handleChangeLanguage(loc),
    icon: locale === loc ? <Check className="h-4 w-4" /> : <span className="h-4 w-4" />,
  }));

  return (
    <XDropdownMenu
      trigger={
        <button
          className="text-[10px] sm:text-xs md:text-sm font-medium px-1.5 sm:px-2 py-1.5 rounded-md hover:bg-muted transition-colors touch-manipulation min-w-[28px] sm:min-w-0 h-9 sm:h-auto"
          aria-label="Change language"
        >
          {LOCALE_NAMES[locale]}
        </button>
      }
      items={languageItems}
      align="end"
      showChevron={true}
    />
  );
}
