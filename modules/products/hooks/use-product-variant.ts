import { useLayoutEffect, useState, startTransition } from "react";
import { Product, ProductVariant } from "../types";
import { getAvailableSizesForColor, getAvailableColorsForSize, findVariantByColorAndSize } from "../helpers";

export function useProductVariant(product: Product) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  const currentStock = selectedVariant?.stock ?? product.stock;
  const isOutOfStock = currentStock === 0 || currentStock === undefined || currentStock === null;

  useLayoutEffect(() => {
    if (product?.variants?.length) {
      const colors = new Set<string>();
      const sizes = new Set<string>();

      product.variants.forEach((v: ProductVariant) => {
        if (v.color?.code) {
          colors.add(v.color.code);
        }
        if (v.size?.name) {
          sizes.add(v.size.name);
        }
      });

      startTransition(() => {
        setAvailableColors(Array.from(colors));
        setAvailableSizes(Array.from(sizes));
      });
    } else {
      startTransition(() => {
        setAvailableColors([]);
        setAvailableSizes([]);
      });
    }
  }, [product]);

  useLayoutEffect(() => {
    if (product?.variants?.length) {
      const activeVariants = product.variants.filter(
        (v: ProductVariant) => v.isActive ?? true
      );
      const firstVariant = activeVariants[0] || product.variants[0];
      startTransition(() => {
        setSelectedVariant(firstVariant);
        if (firstVariant.color?.code && firstVariant.color.code.trim() !== "") {
          setSelectedColor(firstVariant.color.code);
        }
        if (firstVariant.size?.name && firstVariant.size.name.trim() !== "") {
          setSelectedSize(firstVariant.size.name);
        }
      });
    }
  }, [product]);

  useLayoutEffect(() => {
    if (product?.variants) {
      const variant = findVariantByColorAndSize(
        product.variants,
        selectedColor,
        selectedSize
      );

      if (variant) {
        startTransition(() => {
          setSelectedVariant(variant);
        });
      }
    }
  }, [product, selectedColor, selectedSize]);

  useLayoutEffect(() => {
    startTransition(() => {
      setQuantity(1);
    });
  }, [selectedColor, selectedSize]);

  const getAvailableSizes = (colorCode: string) => {
    return getAvailableSizesForColor(product.variants ?? [], colorCode);
  };

  const getAvailableColors = (sizeName: string) => {
    return getAvailableColorsForSize(product.variants ?? [], sizeName);
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

