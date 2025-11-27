import { useState } from "react";
import { useRouter } from "@/lib/i18n/routing";
import { useSearchParams } from "@/lib/hooks";
import { getProductUrl } from "@/lib/helpers";
import { ROUTER } from "@/lib/constants";
import { Product } from "@/modules/products/types";

export function useSearchHeader() {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { setFilter } = useSearchParams();

  const resetKeyword = () => {
    setKeyword("");
  };

  const handleSearch = () => {
    setIsOpen(false);
    if (!keyword?.trim()) {
      setFilter({ search: "" });
      return;
    }

    const searchUrl = keyword?.trim()
      ? `${ROUTER.SEARCH}?search=${encodeURIComponent(keyword.trim())}`
      : ROUTER.SEARCH;
    router.push(searchUrl);
    resetKeyword();
  };

  const getSearchUrl = () => {
    if (!keyword?.trim()) {
      return ROUTER.SEARCH;
    }
    return `${ROUTER.SEARCH}?search=${encodeURIComponent(keyword.trim())}`;
  };

  const handleViewAll = () => {
    handleSearch();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetKeyword();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleProductSelect = (product: Product) => {
    router.push(getProductUrl(product));
    setIsOpen(false);
    resetKeyword();
  };

  return {
    keyword,
    isOpen,
    setKeyword,
    setIsOpen,
    resetKeyword,
    handleSearch,
    handleViewAll,
    getSearchUrl,
    handleOpenChange,
    handleKeyDown,
    handleInputChange,
    handleProductSelect,
  };
}

