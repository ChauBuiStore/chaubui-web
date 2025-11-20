import { useEffect, useState } from "react";
import { Product, ProductVariant } from "../types";
import { getAvailableSizesForColor, getAvailableColorsForSize, findVariantByColorAndSize } from "../helpers";

export function useProductVariant(product: Product) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const currentStock = selectedVariant?.stock ?? product.stock;
  const isOutOfStock = currentStock === 0 || currentStock === undefined || currentStock === null;

  useEffect(() => {
    if (product?.variants?.length) {
      const firstVariant = product.variants[0];
      setSelectedVariant(firstVariant);
      if (firstVariant.color?.code && firstVariant.color.code.trim() !== "") {
        setSelectedColor(firstVariant.color.code);
      }
      if (firstVariant.size?.name && firstVariant.size.name.trim() !== "") {
        setSelectedSize(firstVariant.size.name);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product?.variants) {
      const variant = findVariantByColorAndSize(
        product.variants,
        selectedColor,
        selectedSize
      );

      if (variant) {
        setSelectedVariant(variant);
      }
    }
  }, [product, selectedColor, selectedSize]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedColor, selectedSize]);

  const availableColors = Array.from(
    new Set(
      product.variants
        .map((v: ProductVariant) => v.color?.code || "")
        .filter(Boolean)
    )
  ) as string[];

  const availableSizes = Array.from(
    new Set(
      product.variants
        .map((v: ProductVariant) => v.size?.name || "")
        .filter(Boolean)
    )
  ) as string[];

  const getAvailableSizes = (colorCode: string) => {
    return getAvailableSizesForColor(product.variants, colorCode);
  };

  const getAvailableColors = (sizeName: string) => {
    return getAvailableColorsForSize(product.variants, sizeName);
  };

  return {
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
  };
}

