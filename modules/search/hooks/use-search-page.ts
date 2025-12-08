import { useState, useLayoutEffect, startTransition } from "react";
import { useSearchParams } from "@/lib/hooks";
import { usePathname } from "@/lib/i18n/routing";
import { useRouter } from "@/lib/i18n/routing";
import { ROUTER } from "@/lib/constants";

export function useSearchPage(initialSearch: string) {
  const { filters, setFilter } = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(
    (filters.search as string) || initialSearch || ""
  );

  useLayoutEffect(() => {
    if (initialSearch !== inputValue) {
      startTransition(() => {
        setInputValue(initialSearch || "");
      });
    }
  }, [initialSearch, inputValue]);

  const handleSearch = () => {
    if (!inputValue || !inputValue.trim()) {
      if (pathname === ROUTER.SEARCH) {
        setFilter({ search: undefined, page: undefined, limit: undefined });
      } else {
        router.push(ROUTER.SEARCH);
      }
      return;
    }

    if (pathname === ROUTER.SEARCH) {
      setFilter({ search: inputValue.trim() });
    } else {
      router.push(`${ROUTER.SEARCH}?search=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return {
    inputValue,
    handleSearch,
    handleInputChange,
    handleKeyDown,
  };
}

