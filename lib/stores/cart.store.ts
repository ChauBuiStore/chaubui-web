"use client";

import { cartService } from "@/lib/services/cart.service";
import type { AddToCartInput, Cart } from "@/modules/cart/types";
import { useEffect } from "react";
import { create } from "zustand";

interface CartStore extends Cart {
  _hasHydrated: boolean;
  _shouldOpenPopover: boolean;
  setHasHydrated: (state: boolean) => void;
  setShouldOpenPopover: (state: boolean) => void;
  addItem: (input: AddToCartInput) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

export const useCartStore = create<CartStore>((set) => {
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    _hasHydrated: false,
    _shouldOpenPopover: false,

    setHasHydrated: (state: boolean) => {
      set({ _hasHydrated: state });
    },

    setShouldOpenPopover: (state: boolean) => {
      set({ _shouldOpenPopover: state });
    },

    addItem: (input: AddToCartInput) => {
      try {
        const updatedCart = cartService.addItem(input);
        set({ ...updatedCart, _shouldOpenPopover: true });
      } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
      }
    },

    updateItemQuantity: (itemId: string, quantity: number) => {
      try {
        const updatedCart = cartService.updateItem(itemId, { quantity });
        set(updatedCart);
      } catch (error) {
        console.error("Error updating item quantity:", error);
        throw error;
      }
    },

    removeItem: (itemId: string) => {
      try {
        const updatedCart = cartService.removeItem(itemId);
        set(updatedCart);
      } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
      }
    },

    clearCart: () => {
      try {
        const updatedCart = cartService.clearCart();
        set(updatedCart);
      } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
      }
    },

    refreshCart: () => {
      const cart = cartService.getCart();
      set(cart);
    },
  };
});

export const cartSelectors = {
  items: (state: CartStore) => state.items,
  totalItems: (state: CartStore) => state.totalItems,
  totalPrice: (state: CartStore) => state.totalPrice,
  isEmpty: (state: CartStore) => state.items.length === 0,
  hasHydrated: (state: CartStore) => state._hasHydrated,
  shouldOpenPopover: (state: CartStore) => state._shouldOpenPopover,
};

export const useHydrateCartStore = () => {
  const hasHydrated = useCartStore(cartSelectors.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      const cart = cartService.getCart();
      useCartStore.setState({
        ...cart,
        _hasHydrated: true,
      });
    }
  }, [hasHydrated]);

  return hasHydrated;
};

