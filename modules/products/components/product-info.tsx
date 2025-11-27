"use client";

import { XButton, XQuantity } from "@/components/common";
import { useTranslations } from "@/lib/hooks";
import { useProductVariant, useAddToCart } from "../hooks";
import { useEffect, useState } from "react";
import {
  getColorButtonData,
  getSizeButtonData,
  hasNonNoneVariants,
  hasValidColors,
  hasValidSizes,
  filterValidColors,
  filterValidSizes,
  getVariantButtonClassName,
} from "../helpers";
import { ProductPriceDisplay } from "./product-price-display";
import { ShoppingCart } from "lucide-react";
import { Product } from "../types";

// Lazy load HTML parser để giảm bundle size
function ProductDescription({ description }: { description: string }) {
  const [parsedContent, setParsedContent] = useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("product");

  useEffect(() => {
    if (!description) {
      setParsedContent(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Dynamic import html-react-parser chỉ khi cần
    Promise.all([
      import("html-react-parser"),
      import("@/lib/utils/sanitize.utils")
    ]).then(([{ default: parse }, { parseHTML }]) => {
      setParsedContent(parseHTML(description));
      setIsLoading(false);
    }).catch(() => {
      setParsedContent(description);
      setIsLoading(false);
    });
  }, [description]);

  if (!description) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">{t("description")}</h3>
      <div className="prose prose-sm max-w-none">
        {isLoading ? (
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        ) : (
          parsedContent
        )}
      </div>
    </div>
  );
}

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations("product");
  const {
    selectedVariant,
    selectedColor,
    selectedSize,
    quantity,
    setQuantity,
    setSelectedColor,
    setSelectedSize,
    currentStock,
    isOutOfStock,
    availableColors,
    availableSizes,
    getAvailableSizes,
    getAvailableColors,
  } = useProductVariant(product);

  const { isAdding, handleAddToCart } = useAddToCart(
    product,
    selectedVariant,
    quantity,
    () => setQuantity(1)
  );

  return (
    <>
      <div className="border-t border-dotted border-gray-300 py-2">
        <ProductPriceDisplay variant={selectedVariant} product={product} />
      </div>

      {hasNonNoneVariants(product.variants || []) ? (
        <>
          {hasValidColors(availableColors) && (
            <div className="flex flex-wrap gap-2 border-t border-dotted border-gray-300 py-4">
              {filterValidColors(availableColors).map((colorCode: string) => {
                const { colorObj, isAvailable, isSelected } = getColorButtonData(
                  colorCode,
                  product,
                  selectedColor,
                  selectedSize,
                  getAvailableColors
                );

                return (
                  <XButton
                    key={colorCode}
                    onClick={() => setSelectedColor(colorCode)}
                    disabled={!isAvailable}
                    className={getVariantButtonClassName(isSelected)}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300 bg-gray-300"
                      style={{ backgroundColor: colorCode || "#ccc" }}
                    />
                    {colorObj?.name || colorCode}
                  </XButton>
                );
              })}
            </div>
          )}
          {hasValidSizes(availableSizes) && (
            <div className="flex flex-wrap gap-2 border-t border-dotted border-gray-300 py-4">
              {filterValidSizes(availableSizes).map((sizeName: string) => {
                const { sizeObj, isAvailable, isSelected } = getSizeButtonData(
                  sizeName,
                  product,
                  selectedSize,
                  selectedColor,
                  getAvailableSizes
                );

                return (
                  <XButton
                    key={sizeName}
                    onClick={() => setSelectedSize(sizeName)}
                    disabled={!isAvailable}
                    className={getVariantButtonClassName(isSelected)}
                  >
                    {sizeObj?.name || sizeName}
                  </XButton>
                );
              })}
            </div>
          )}
        </>
      ) : null}

      {!isOutOfStock && (
        <div className="pt-4 border-t border-dotted border-gray-300">
          <div className="flex items-center justify-between gap-4">
            <XQuantity
              size="small"
              value={quantity}
              onChange={setQuantity}
              max={currentStock || 99}
            />
            <p className="text-sm text-gray-600">
              {t("stockRemaining", { count: currentStock })}
            </p>
          </div>
        </div>
      )}

      <XButton
        size="xl"
        className="text-sm uppercase font-bold w-full bg-black text-white py-3 px-6 transition-colors hover:bg-gray-800"
        onClick={handleAddToCart}
        disabled={isAdding || isOutOfStock}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {isOutOfStock ? t("outOfStock") : t("addToCart")}
      </XButton>

      <ProductDescription description={product.description || ""} />
    </>
  );
}
