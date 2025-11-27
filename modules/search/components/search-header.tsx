"use client";

import { XButton, XInput, XPopover } from "@/components/common";
import { PAGINATION, QUERY_KEYS } from "@/lib/constants";
import { useDebounce, useTranslations } from "@/lib/hooks";
import { productService } from "@/lib/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { SearchAutocomplete } from "./search-autocomplete";
import { useSearchHeader } from "../hooks";

interface SearchHeaderProps {
  isMobile?: boolean;
}

export function SearchHeader({ isMobile = false }: SearchHeaderProps) {
  const t = useTranslations("search");
  const {
    keyword,
    isOpen,
    resetKeyword,
    handleSearch,
    handleViewAll,
    getSearchUrl,
    handleOpenChange,
    handleKeyDown,
    handleInputChange,
    handleProductSelect,
  } = useSearchHeader();

  const debouncedKeyword = useDebounce(keyword, 500);

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, debouncedKeyword],
    queryFn: async () => {
      if (!debouncedKeyword.trim()) {
        return null;
      }
      return await productService.getProducts({
        search: debouncedKeyword.trim(),
        limit: PAGINATION.AUTOCOMPLETE_LIMIT,
      });
    },
    enabled: !!debouncedKeyword.trim(),
  });

  const products = data?.data || [];
  const totalCount = data?.meta?.totalItems || 0;
  const isDebouncing = keyword.trim() !== debouncedKeyword;

  if (isMobile) {
    return (
      <div className="w-full bg-muted/50 px-3 py-2.5">
        <div className="flex flex-col relative w-full">
          <div className="relative flex items-center">
            <XInput
              type="text"
              placeholder={t("placeholder")}
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="pr-11 bg-background text-sm h-10 border-border/50 focus:border-primary"
              containerClassName="flex-1"
            />
            {keyword ? (
              <button
                onClick={resetKeyword}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-muted transition-colors touch-manipulation"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            ) : (
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-muted transition-colors touch-manipulation"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {keyword && (
            <div className="mt-2.5 border-t border-border/50 pt-2.5">
              <SearchAutocomplete
                isLoading={isLoading || isDebouncing}
                queryError={queryError}
                products={products}
                onProductSelect={handleProductSelect}
                isMobile={true}
                totalCount={totalCount}
                onViewAll={handleViewAll}
                searchUrl={getSearchUrl()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <XPopover
      open={isOpen}
      onOpenChange={handleOpenChange}
      align="center"
      side="top"
      sideOffset={12}
      contentClassName="w-[28rem] relative p-0"
      trigger={
        <div className="flex flex-col items-start">
          <XButton variant="ghost" className="uppercase p-0 font-bold">
            {t("title")}
          </XButton>
          <div className="w-[150px] h-px bg-primary"></div>
        </div>
      }
    >
      <div className="p-4">
        <div className="relative flex-1">
          <XInput
            type="text"
            placeholder={t("placeholder")}
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pr-10 text-sm"
          />
          {keyword ? (
            <XButton
              variant="ghost"
              size="sm"
              onClick={resetKeyword}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </XButton>
          ) : (
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 p-0 hover:bg-gray-100" />
          )}
        </div>

        {keyword && (
          <div className="mt-4 border-t pt-4">
            <SearchAutocomplete
              isLoading={isLoading || isDebouncing}
              queryError={queryError}
              products={products}
              onProductSelect={handleProductSelect}
              totalCount={totalCount}
              onViewAll={handleViewAll}
              searchUrl={getSearchUrl()}
            />
          </div>
        )}
      </div>
    </XPopover>
  );
}
