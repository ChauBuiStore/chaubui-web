import { useToast, useTranslations } from "@/lib/hooks";
import { cartSelectors, useCartStore } from "@/lib/stores";
import type { AddToCartInput } from "../types";

export function useCart() {
  const store = useCartStore();
  const toast = useToast();
  const t = useTranslations("cart");

  const items = useCartStore(cartSelectors.items);
  const totalItems = useCartStore(cartSelectors.totalItems);
  const totalPrice = useCartStore(cartSelectors.totalPrice);
  const isEmpty = useCartStore(cartSelectors.isEmpty);
  const hasHydrated = useCartStore(cartSelectors.hasHydrated);

  const addToCart = (input: AddToCartInput) => {
    try {
      store.addItem(input);
      toast.success(t("addSuccess"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    try {
      store.updateItemQuantity(itemId, quantity);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const removeFromCart = (itemId: string) => {
    try {
      store.removeItem(itemId);
      toast.success(t("removeSuccess"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const clearCart = () => {
    try {
      store.clearCart();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    hasHydrated,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}

