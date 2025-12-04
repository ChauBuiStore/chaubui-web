"use client";

import { XBadge, XCard } from "@/components/common";
import { getProductImageUrl, getProductDisplayPrice, getProductUrl } from "@/lib/helpers";
import { useTranslations } from "@/lib/hooks";
import { Link } from "@/lib/i18n/routing";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/modules/products/types";
import Image from "next/image";

interface XProductProps {
  product: Product;
  priority?: boolean;
}

export function XProduct({
  product,
  priority = false,
}: XProductProps) {
  const t = useTranslations("product");

  const imageUrl = getProductImageUrl(product);
  const displayPrice = getProductDisplayPrice(product);
  const productUrl = getProductUrl(product);
  const isOutOfStock = displayPrice.stock === 0;

  return (
    <XCard className="overflow-hidden p-0 gap-0 border-none shadow-none group">
      <div className="p-0">
        {isOutOfStock ? (
          <div className="aspect-square bg-muted relative overflow-hidden rounded-3xl">
            {displayPrice.discountPercent &&
              displayPrice.discountPercent > 0 ? (
              <XBadge
                variant="secondary"
                className="absolute top-2 left-2 z-10 bg-background text-destructive hover:bg-background transition-all duration-200 ease-in-out font-bold"
              >
                -{Math.round(displayPrice.discountPercent)}%
              </XBadge>
            ) : null}

            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${product.name} tại Livin N Decoration`}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out overflow-hidden opacity-50 grayscale"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                priority={priority}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground text-sm text-center">
                  {product.name}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/80 z-20 rounded-3xl"></div>
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <span className="text-white text-xs md:text-sm bg-black px-3 py-1.5 rounded">
                {t("outOfStock")}
              </span>
            </div>
          </div>
        ) : (
          <Link href={productUrl}>
            <div className="aspect-square bg-muted relative cursor-pointer overflow-hidden rounded-3xl">
              {displayPrice.discountPercent &&
                displayPrice.discountPercent > 0 ? (
                <XBadge
                  variant="secondary"
                  className="absolute top-2 left-2 z-10 bg-background text-destructive hover:bg-background transition-all duration-200 ease-in-out font-bold"
                >
                  -{Math.round(displayPrice.discountPercent)}%
                </XBadge>
              ) : null}

              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${product.name} tại Livin N Decoration`}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out overflow-hidden hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  priority={priority}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground text-sm text-center">
                    {product.name}
                  </span>
                </div>
              )}
            </div>
          </Link>
        )}
      </div>
      <div className="py-4">
        {isOutOfStock ? (
          <h3 className="font-medium text-sm mb-2 min-h-[1.25rem] line-clamp-1 truncate">
            {product.name}
          </h3>
        ) : (
          <Link href={productUrl} className="block">
            <h3 className="font-medium text-sm mb-2 min-h-[1.25rem] line-clamp-1 truncate group-hover:text-destructive transition-colors duration-200 ease-in-out cursor-pointer">
              {product.name}
            </h3>
          </Link>
        )}
        <div className="flex items-center gap-2">
          <span
            className={`font-bold ${displayPrice.discountPercent && displayPrice.discountPercent > 0
              ? "text-destructive"
              : "text-foreground"
              }`}
          >
            {formatPrice(displayPrice.salePrice || 0)}
          </span>
          {displayPrice.originalPrice &&
            displayPrice.originalPrice > displayPrice.salePrice ? (
            <span className="text-muted-foreground line-through text-sm">
              {formatPrice(displayPrice.originalPrice || 0)}
            </span>
          ) : null}
        </div>
      </div>
    </XCard>
  );
}
