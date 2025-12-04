import { Product, ProductDetail, ProductImage, ProductVariant } from "../types";

export function getAvailableSizesForColor(
  variants: ProductVariant[],
  colorCode: string
): string[] {
  return variants
    .filter((v: ProductVariant) => v.color?.code === colorCode)
    .map((v: ProductVariant) => v.size?.name || "")
    .filter(Boolean);
}

export function getAvailableColorsForSize(
  variants: ProductVariant[],
  sizeName: string
): string[] {
  return variants
    .filter((v: ProductVariant) => v.size?.name === sizeName)
    .map((v: ProductVariant) => v.color?.code || "")
    .filter(Boolean);
}

export function findVariantByColorAndSize(
  variants: ProductVariant[],
  colorCode: string | null,
  sizeName: string | null
): ProductVariant | undefined {
  if (!variants || variants.length === 0) {
    return undefined;
  }

  if (colorCode && sizeName) {
    return variants.find(
      (v: ProductVariant) =>
        v.color?.code === colorCode && v.size?.name === sizeName
    );
  }

  if (colorCode && !sizeName) {
    return variants.find(
      (v: ProductVariant) => v.color?.code === colorCode
    );
  }

  if (sizeName && !colorCode) {
    return variants.find(
      (v: ProductVariant) => v.size?.name === sizeName
    );
  }

  return undefined;
}

export function getVariantColorByCode(
  variants: ProductVariant[],
  colorCode: string
) {
  return variants.find(
    (v: ProductVariant) => v.color?.code === colorCode
  )?.color;
}

export function getVariantSizeByName(
  variants: ProductVariant[],
  sizeName: string
) {
  return variants.find(
    (v: ProductVariant) => v.size?.name === sizeName
  )?.size;
}

export interface ColorButtonData {
  colorCode: string;
  colorObj: ReturnType<typeof getVariantColorByCode>;
  isAvailable: boolean;
  isSelected: boolean;
}

export interface SizeButtonData {
  sizeName: string;
  sizeObj: ReturnType<typeof getVariantSizeByName>;
  isAvailable: boolean;
  isSelected: boolean;
}

export function getColorButtonData(
  colorCode: string,
  product: Product,
  selectedColor: string | null,
  selectedSize: string | null,
  getAvailableColors: (sizeName: string) => string[]
): ColorButtonData {
  const colorObj = getVariantColorByCode(product.variants || [], colorCode);
  const isAvailable = selectedSize
    ? getAvailableColors(selectedSize).includes(colorCode)
    : true;
  const isSelected = selectedColor === colorCode;

  return {
    colorCode,
    colorObj,
    isAvailable,
    isSelected,
  };
}

export function getSizeButtonData(
  sizeName: string,
  product: Product,
  selectedSize: string | null,
  selectedColor: string | null,
  getAvailableSizes: (colorCode: string) => string[]
): SizeButtonData {
  const sizeObj = getVariantSizeByName(product.variants || [], sizeName);
  const isAvailable = selectedColor
    ? getAvailableSizes(selectedColor).includes(sizeName)
    : true;
  const isSelected = selectedSize === sizeName;

  return {
    sizeName,
    sizeObj,
    isAvailable,
    isSelected,
  };
}

export function hasNonNoneVariants(variants: Array<{ variantType?: string }>): boolean {
  return variants?.length > 0 && variants.some((v) => v.variantType !== "NONE");
}

export function hasValidColors(colors: string[]): boolean {
  return colors.length > 0 && colors.some((color) => color && color.trim() !== "");
}

export function hasValidSizes(sizes: string[]): boolean {
  return sizes.length > 0 && sizes.some((size) => size && size.trim() !== "");
}

export function filterValidColors(colors: string[]): string[] {
  return colors.filter((colorCode) => colorCode && colorCode.trim() !== "");
}

export function filterValidSizes(sizes: string[]): string[] {
  return sizes.filter((sizeName) => sizeName && sizeName.trim() !== "");
}

export function getProductPriceInfo(
  variant: ProductVariant | null | undefined,
  product: Product
): {
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  hasDiscount: boolean;
} {
  const originalPrice = variant?.originalPrice || product.originalPrice || 0;
  const salePrice = variant?.salePrice || product.salePrice || 0;
  const discountPercent = variant?.discountPercent || product.discountPercent || 0;
  const hasDiscount = salePrice > 0 && salePrice < originalPrice;

  return {
    originalPrice,
    salePrice,
    discountPercent,
    hasDiscount,
  };
}

export function getProductImageAlt(image: ProductImage, index: number, prefix: string = "Xem hình ảnh"): string {
  if (image.alt && image.alt.trim() && !image.alt.toLowerCase().includes('thumbnail') && !image.alt.toLowerCase().includes('image')) {
    return image.alt;
  }
  return `${prefix} ${index + 1} của sản phẩm`;
}

export function prepareProductImages(product: ProductDetail): ProductImage[] {
  if (product.images && product.images.length > 0) {
    return product.images.map(img => ({
      ...img,
      alt: img.alt && img.alt.trim() && !img.alt.toLowerCase().includes('thumbnail') && !img.alt.toLowerCase().includes('image')
        ? img.alt
        : `${product.name} - Hình ảnh sản phẩm`,
    }));
  }

  if (product.thumbnailUrl) {
    return [{
      id: product.thumbnailId || 'thumbnail',
      file: {
        alt: `${product.name} - Hình ảnh sản phẩm`,
        createdAt: new Date().toISOString(),
        fileName: 'thumbnail',
        id: product.thumbnailId || 'thumbnail',
        key: 'thumbnail',
        mimeType: 'image/jpeg',
        size: '0',
        sortOrder: 0,
        updatedAt: new Date().toISOString(),
        url: product.thumbnailUrl,
      },
      alt: `${product.name} - Hình ảnh sản phẩm`,
      sortOrder: 0,
      isThumbnail: true,
    }];
  }

  return [];
}

export function getVariantButtonClassName(isSelected: boolean): string {
  const baseClasses = "px-3 py-2 border-1 bg-transparent text-black text-sm font-medium transition-colors";
  const selectedClasses = "border-black hover:bg-transparent";
  const unselectedClasses = "border-gray-300 hover:border-black hover:bg-transparent";

  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
}