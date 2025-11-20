import type { AddToCartInput, CartItem } from "../types";
import type { Color } from "@/lib/types/color.type";
import type { Size } from "@/lib/types/size.type";
import type { Product, ProductVariant } from "@/modules/products/types";
import { getLocalizedField } from "@/lib/utils/locale.utils";
import { getProductImageUrl } from "@/lib/helpers/product.helper";

export function createAddToCartInput(
  product: Product,
  variant: ProductVariant | null | undefined,
  quantity: number
): AddToCartInput {
  return {
    productId: product.id,
    productSlug: product.slug,
    name: product.name,
    nameVi: product.nameVi,
    nameEn: product.nameEn,
    nameKm: product.nameKm,
    price: variant?.salePrice || product.salePrice || 0,
    quantity,
    image: getProductImageUrl(product) || undefined,
    size: variant?.size,
    color: variant?.color,
    variantId: variant?.id,
  };
}

export function calculateItemTotal(item: CartItem): number {
  return item.price * item.quantity;
}

interface VariantItem {
  color?: Color;
  size?: Size;
}

export function getItemVariantName(
  item: VariantItem,
  locale: string
): string | undefined {
  const parts: string[] = [];
  if (item.color) {
    const colorName = getLocalizedField(
      item.color as unknown as Record<string, unknown>,
      "name",
      locale
    );
    parts.push(colorName);
  }
  if (item.size) {
    const sizeName = getLocalizedField(
      item.size as unknown as Record<string, unknown>,
      "name",
      locale
    );
    parts.push(sizeName);
  }
  return parts.length > 0 ? parts.join(" - ") : undefined;
}

export function getCartItemDisplayName(
  item: CartItem,
  locale: string
): string {
  const itemName = getLocalizedField(
    item as unknown as Record<string, unknown>,
    "name",
    locale
  );
  const variantName = getItemVariantName(item, locale);

  if (variantName) {
    return `${itemName} - ${variantName}`;
  }
  return itemName;
}

export function getCartItemAltText(
  item: CartItem,
  locale: string,
  context: "cart" | "order" = "cart"
): string {
  const itemName = getLocalizedField(
    item as unknown as Record<string, unknown>,
    "name",
    locale
  );
  const variantName = getItemVariantName(item, locale);

  const contextText = context === "cart" ? "trong giỏ hàng" : "trong đơn hàng";

  if (variantName) {
    return `${itemName} - ${variantName} ${contextText}`;
  }
  return `${itemName} ${contextText}`;
}

export function splitItemName(fullItemName: string): [string, string | undefined] {
  if (fullItemName.includes(" - ")) {
    const [itemName, ...variantParts] = fullItemName.split(" - ");
    return [itemName, variantParts.join(" - ")];
  }
  return [fullItemName, undefined];
}

