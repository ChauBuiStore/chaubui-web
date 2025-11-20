"use client";

import { XButton } from "@/components/common";
import { useTranslations } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/modules/cart/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import { calculateItemTotal, getCartItemDisplayName, getCartItemAltText, splitItemName } from "@/modules/cart/helpers";

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  total: number;
  isProcessing?: boolean;
  onSubmit: () => void;
}

export function CheckoutSummary({
  items,
  subtotal,
  total,
  isProcessing,
  onSubmit,
}: CheckoutSummaryProps) {
  const t = useTranslations("checkout");
  const locale = useLocale();

  return (
    <div className="bg-muted p-6 rounded-lg space-y-6 sticky top-24">
      <h3 className="text-lg font-semibold">{t("orderSummary")}</h3>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 pt-2">
        {items.map((item) => {
          const fullItemName = getCartItemDisplayName(item, locale);
          const itemAltText = getCartItemAltText(item, locale, "order");
          const [itemName, itemVariantName] = splitItemName(fullItemName);

          return (
            <div key={item.id} className="flex gap-3">
              {item.image && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={itemAltText}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2">{itemName}</h4>
                {itemVariantName && (
                  <p className="text-xs text-muted-foreground">
                    {itemVariantName} - x{item.quantity}
                  </p>
                )}
                {!itemVariantName && (
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                )}
                <p className="text-sm font-medium text-foreground mt-1">
                  {formatPrice(calculateItemTotal(item))}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("subtotal")}</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>{t("total")}</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>

      <XButton
        onClick={onSubmit}
        disabled={isProcessing}
        size="xl"
        className="w-full rounded-none shadow-none"
      >
        {isProcessing ? t("processing") : t("placeOrder")}
      </XButton>
    </div>
  );
}

