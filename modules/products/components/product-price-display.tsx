import { formatPrice } from "@/lib/utils";
import { getProductPriceInfo } from "../helpers";
import { Product, ProductVariant } from "../types";

interface ProductPriceDisplayProps {
  variant: ProductVariant | null | undefined;
  product: Product;
}

export function ProductPriceDisplay({ variant, product }: ProductPriceDisplayProps) {
  const { originalPrice, salePrice, discountPercent, hasDiscount } = getProductPriceInfo(
    variant,
    product
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xl font-bold text-red-500">
        {formatPrice(hasDiscount ? salePrice : originalPrice)}
      </span>

      {hasDiscount && (
        <>
          <span className="text-base text-gray-500 line-through">
            {formatPrice(originalPrice)}
          </span>

          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded">
              -{discountPercent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}

