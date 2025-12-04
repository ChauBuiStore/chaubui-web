"use client";

import { XButton, XSkeletonSearchAutocomplete } from "@/components/common";
import { useTranslations } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/modules/products/types";
import { getProductUrl } from "@/lib/helpers";
import { Link } from "@/lib/i18n/routing";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface SearchAutocompleteProps {
  isLoading: boolean;
  queryError: Error | null;
  products: Product[];
  onProductSelect: (product: Product) => void;
  isMobile?: boolean;
  totalCount?: number;
  onViewAll?: () => void;
  searchUrl?: string;
}

export function SearchAutocomplete({
  isLoading,
  queryError,
  products,
  onProductSelect,
  isMobile = false,
  totalCount = 0,
  onViewAll,
  searchUrl,
}: SearchAutocompleteProps) {
  const t = useTranslations("search");
  const displayedCount = products.length;
  const hasMore = totalCount > displayedCount;

  if (isLoading) {
    return <XSkeletonSearchAutocomplete itemCount={5} isMobile={isMobile} />;
  }

  if (queryError) {
    return (
      <div
        className={`text-center text-red-500 ${isMobile ? "py-3 text-xs" : "py-4 text-sm"
          }`}
      >
        {t("searchError")}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className={`text-center text-gray-500 ${isMobile ? "py-3 text-xs" : "py-4 text-sm"
          }`}
      >
        {t("noResults")}
      </div>
    );
  }

  return (
    <>
      <div
        className={
          isMobile ? "max-h-60 overflow-y-auto" : "max-h-80 overflow-y-auto"
        }
      >
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <Link
              key={product.id}
              href={getProductUrl(product)}
              onClick={() => onProductSelect(product)}
              className={`w-full flex items-center transition-colors text-left hover:bg-gray-50 ${isMobile ? "space-x-2 p-2.5" : "space-x-3 p-3.5"
                }`}
            >
              <div
                className={`relative flex-shrink-0 ${isMobile ? "w-10 h-10" : "w-12 h-12"
                  }`}
              >
                <Image
                  src={product.thumbnailUrl || "/placeholder.jpg"}
                  alt={`${product.name}`}
                  fill
                  className="object-cover rounded-md"
                  sizes={isMobile ? "40px" : "48px"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-medium text-gray-900 truncate ${isMobile ? "text-xs" : "text-sm"
                    }`}
                >
                  {product.name}
                </h4>
                <div
                  className={`flex items-center flex-wrap gap-1 ${isMobile ? "mt-0.5" : "mt-1"
                    }`}
                >
                  <span
                    className={`font-semibold ${product.originalPrice && product.salePrice && product.originalPrice > product.salePrice
                      ? "text-red-600"
                      : "text-gray-900"
                      } ${isMobile ? "text-xs" : "text-sm"}`}
                  >
                    {formatPrice(product.salePrice ?? 0)}
                  </span>
                  {product.originalPrice && product.salePrice && product.originalPrice > product.salePrice && (
                    <>
                      <span
                        className={`text-gray-500 line-through ${isMobile ? "text-[10px]" : "text-xs"
                          }`}
                      >
                        {formatPrice(product.originalPrice ?? 0)}
                      </span>
                      {product.discountPercent && product.discountPercent > 0 && (
                        <span
                          className={`bg-red-100 text-red-600 rounded ${isMobile
                            ? "text-[10px] px-1 py-0.5"
                            : "text-xs px-1"
                            }`}
                        >
                          -{product.discountPercent ?? 0}%
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {hasMore && searchUrl && (
        <div className={isMobile ? "mt-2 pt-2 border-t" : "mt-3 pt-3 border-t"}>
          <XButton
            variant="outline"
            asChild
            className={`w-full justify-between ${isMobile ? "h-9 text-xs" : "h-10 text-sm"
              }`}
          >
            <Link href={searchUrl} onClick={onViewAll}>
              <span>Xem thêm {totalCount - displayedCount} sản phẩm</span>
              <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
            </Link>
          </XButton>
        </div>
      )}
    </>
  );
}
