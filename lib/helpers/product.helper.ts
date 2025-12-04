import { ROUTER } from "@/lib/constants";
import { Product } from "@/modules/products/types";

export function getProductUrl(product: Product): string {
  return `${ROUTER.PRODUCT}/${product.slug}`;
}

export function getProductImageUrl(product: Product): string | null {
  return product.thumbnailUrl || null;
}

export function getProductDisplayPrice(product: Product): {
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  stock: number | undefined;
} {
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants[0];
    return {
      originalPrice: firstVariant.originalPrice ?? 0,
      salePrice: firstVariant.salePrice ?? firstVariant.originalPrice ?? 0,
      discountPercent: firstVariant.discountPercent ?? 0,
      stock: firstVariant.stock,
    };
  }

  return {
    originalPrice: product.originalPrice ?? 0,
    salePrice: product.salePrice ?? 0,
    discountPercent: product.discountPercent ?? 0,
    stock: product.stock,
  };
}
