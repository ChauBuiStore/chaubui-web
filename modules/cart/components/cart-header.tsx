"use client";

import { XButton, XPopover } from "@/components/common";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import { ShoppingBasket, ShoppingCart, X } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useLayoutEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/lib/constants";
import { cartSelectors, useCartStore } from "@/lib/stores";
import { getCartItemDisplayName, getCartItemAltText, splitItemName } from "../helpers";
import { useCart } from "../hooks";

export function CartHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleViewCart = (onClose?: () => void) => {
    router.push(ROUTER.CART);
    onClose?.();
  };

  const handleCheckout = (isEmpty: boolean, onClose?: () => void) => {
    if (!isEmpty) {
      router.push(ROUTER.CHECKOUT);
      onClose?.();
    }
  };
  const t = useTranslations("cart");
  const locale = useLocale();
  const {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    hasHydrated,
    removeFromCart,
  } = useCart();

  const shouldOpenPopover = useCartStore(cartSelectors.shouldOpenPopover);

  const shouldOpenPopoverValue = Boolean(shouldOpenPopover);
  const hasHydratedValue = Boolean(hasHydrated);
  const isEmptyValue = Boolean(isEmpty);

  useLayoutEffect(() => {
    if (isEmptyValue) {
      startTransition(() => {
        setOpen(false);
      });
    }
  }, [isEmptyValue]);

  useLayoutEffect(() => {
    if (shouldOpenPopoverValue && hasHydratedValue && !isEmptyValue) {
      startTransition(() => {
        setOpen(true);
      });
      useCartStore.getState().setShouldOpenPopover(false);
    }
  }, [shouldOpenPopoverValue, hasHydratedValue, isEmptyValue]);

  const displayCount = hasHydrated ? totalItems : 0;
  const formattedCount = displayCount > 99 ? "99+" : String(displayCount);

  return (
    <XPopover
      open={open}
      onOpenChange={setOpen}
      align="end"
      sideOffset={8}
      side="bottom"
      contentClassName="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] lg:w-[28rem] p-4 sm:p-6 relative"
      trigger={
        <XButton
          variant="ghost"
          size="icon"
          className="hover:text-destructive !bg-transparent relative h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
          aria-label="Shopping cart"
        >
          <ShoppingBasket className="h-5 w-5 sm:h-5 sm:w-5" />
          {displayCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-destructive text-white text-[10px] font-bold rounded-full h-4 w-4 sm:h-[18px] sm:w-[18px] flex items-center justify-center min-w-[16px] leading-none">
              {formattedCount}
            </span>
          )}
        </XButton>
      }
    >
      <ScrollArea>
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-md font-medium text-center bg-muted border border-border p-2">
            {t("title")}
          </h3>

          {isEmpty ? (
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="relative">
                <ShoppingCart className="h-16 w-16" />
              </div>
              <p className="text-muted-foreground text-center text-xs">
                {t("noProducts")}
              </p>
            </div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto space-y-3">
              {items.map((item) => {
                const itemAltText = getCartItemAltText(item, locale, "cart");
                const fullItemName = getCartItemDisplayName(item, locale);
                const [itemName, variantName] = splitItemName(fullItemName);

                return (
                  <div
                    key={item.id}
                    className="flex gap-2 sm:gap-3 border-b pb-3 relative group"
                  >
                    <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex-shrink-0 bg-muted rounded overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={itemAltText}
                          width={60}
                          height={60}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs sm:text-sm font-medium truncate">
                        {itemName}
                      </h4>
                      {variantName && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                          {variantName}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <XButton
                      onClick={() => removeFromCart(item.id)}
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 p-1 h-6 w-6 hover:bg-accent rounded-full"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground hover:text-destructive" />
                    </XButton>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t pt-3 sm:pt-4">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-sm sm:text-base font-medium">{t("totalPrice")}</span>
              <span className="text-sm sm:text-base text-destructive font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <XButton
                onClick={() => handleViewCart(() => setOpen(false))}
                size="xl"
                className="flex-1 text-xs sm:text-sm"
              >
                {t("viewCart")}
              </XButton>
              <XButton
                onClick={() => handleCheckout(isEmpty, () => setOpen(false))}
                size="xl"
                className="flex-1 text-xs sm:text-sm hover:bg-background hover:text-foreground hover:border-1 hover:border-foreground rounded-none shadow-none disabled:opacity-50"
              >
                {t("checkout")}
              </XButton>
            </div>
          </div>
        </div>
      </ScrollArea>
    </XPopover>
  );
}
