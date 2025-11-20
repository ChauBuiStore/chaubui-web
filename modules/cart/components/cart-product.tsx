"use client";

import { XButton, XQuantity } from "@/components/common";
import { formatPrice } from "@/lib/utils";
import { ROUTER } from "@/lib/constants";
import type { CartItem } from "../types";
import { X, ShoppingCart } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { getCartItemDisplayName, getCartItemAltText, splitItemName, calculateItemTotal } from "../helpers";
import { useCart } from "../hooks";

interface CartProductProps {
  item: CartItem;
}

export function CartProduct({ item }: CartProductProps) {
  const locale = useLocale();
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const fullItemName = getCartItemDisplayName(item, locale);
  const itemAltText = getCartItemAltText(item, locale, "cart");
  const [itemName, itemVariantName] = splitItemName(fullItemName);
  const itemTotal = calculateItemTotal(item);

  const productUrl = `/${locale}${ROUTER.PRODUCT}/${item.productSlug}`;

  return (
    <div className="flex border-b border-border pb-4">
      <div className="flex flex-grow">
        <Link
          href={productUrl}
          className="w-22 h-22 sm:w-22 sm:h-22 overflow-hidden mr-5 flex-shrink-0 bg-muted rounded"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={itemAltText}
              className="w-full h-full object-cover hover:opacity-80 transition"
              width={100}
              height={100}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </Link>
        <div className="flex-grow">
          <Link href={productUrl}>
            <h3 className="font-bold hover:text-primary transition">
              {itemName}
            </h3>
          </Link>
          {itemVariantName && (
            <p className="text-xs text-muted-foreground mt-1">{itemVariantName}</p>
          )}
          <p className="text-sm mt-1 mb-2">{formatPrice(item.price)}</p>
          <XQuantity
            size="small"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>
      </div>
      <div className="text-right">
        <XButton variant="ghost" size="icon" onClick={handleRemove}>
          <X />
        </XButton>
        <span className="text-lg font-bold text-foreground hidden sm:block mt-4 mr-3">
          {formatPrice(itemTotal)}
        </span>
      </div>
    </div>
  );
}
