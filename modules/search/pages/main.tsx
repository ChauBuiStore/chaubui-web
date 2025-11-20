"use client";

import { XButton, XInput, XPage } from "@/components/common";
import { useTranslations } from "@/lib/hooks";
import { PaginationMeta } from "@/lib/types";
import { Product } from "@/modules/products/types";
import { Search } from "lucide-react";
import { SearchList } from "../components";
import { useSearchPage } from "../hooks";

interface SearchPageProps {
  products: Product[];
  meta: PaginationMeta | null;
  initialSearch: string;
  locale: string;
}

export function SearchPage({ products, meta, initialSearch, locale }: SearchPageProps) {
  const t = useTranslations("search");
  const {
    inputValue,
    handleSearch,
    handleInputChange,
    handleKeyDown,
  } = useSearchPage(initialSearch);
  return (
    <XPage className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        {t("title")}
      </h1>
      {products.length > 0 && (
        <p className="mb-4 text-center text-gray-500">
          {t("productsCount", { count: meta?.totalItems || 0 })}
        </p>
      )}
      <div
        className="text-center w-[60px] h-1 bg-primary mt-[30px] mb-[30px] mx-auto"
        aria-hidden="true"
      />

      <div className="flex justify-center w-full max-w-2xl mx-auto mb-8">
        <XInput
          size="xl"
          type="text"
          placeholder={t("placeholder")}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          containerClassName="flex-1"
        />
        <XButton size="xl" className="w-10" onClick={handleSearch}>
          <Search className="size-4" />
        </XButton>
      </div>

      {initialSearch && products.length === 0 && (
        <div className="pb-6 text-center">
          <h3 className="text-xl font-semibold mb-2">
            {t("noResults")}
          </h3>
          <p>
            {t("noResultsFor", { query: initialSearch })}
          </p>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <p className="mb-6">
            {t("resultsFor", { query: initialSearch })}
          </p>
          <SearchList
            initialProducts={products}
            initialMeta={meta || undefined}
            searchQuery={initialSearch}
            locale={locale}
          />
        </div>
      )}

      {!initialSearch && (
        <p className="text-center">
          {t("noKeyword")}
          <br />
          {t("noKeywordHelp")}
        </p>
      )}
    </XPage>
  );
}
