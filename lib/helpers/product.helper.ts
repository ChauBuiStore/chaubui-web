import { ROUTER } from "@/lib/constants";
import { Product } from "@/modules/products/types";

export function getProductUrl(product: Product): string {
  return `${ROUTER.PRODUCT}/${product.slug}`;
}

export function getProductImageUrl(product: Product): string | null {
  if (product.thumbnailUrl) {
    return product.thumbnailUrl;
  }

  if (product.images?.[0]?.file?.url) {
    return product.images[0].file.url;
  }

  return null;
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
      originalPrice: firstVariant.originalPrice,
      salePrice: firstVariant.salePrice || firstVariant.originalPrice,
      discountPercent: firstVariant.discountPercent || 0,
      stock: firstVariant.stock,
    };
  }

  return {
    originalPrice: product.originalPrice,
    salePrice: product.salePrice,
    discountPercent: product.discountPercent || 0,
    stock: product.stock,
  };
}
